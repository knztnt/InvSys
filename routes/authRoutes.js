const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// importing user model
const User = require('../models/User');
users.use(cors());

// hash key
// ToDo: hide secret key in a different file
process.env.SECRET_KEY = 'secret';


// signup a user
users.post('/register', (req, res) => {
    // user data object
    const userData = {
        username: req.body.username,
        password: req.body.password,
    };

    // find by username
    User.findOne({
        where: {
            username: req.body.username
        }
    })

        .then(user => {
            if (!user) {  // if user does not exist
                bcrypt.hash(req.body.password, 10, (err, hash) => { // hashing password with salt
                    userData.password = hash
                    User.create(userData) // create a new user record in the db
                        .then(user => {
                            res.json({ status: user.username + ' Registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {  // if user exists in the db
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});


// login a user
users.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
            } else {
                res.status(400).json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
});


// get profile of a user
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    User.findOne({
        where: {
            username: decoded.username
        }
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

module.exports = users;
