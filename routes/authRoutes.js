const express = require('express');
const router = express.Router();
const passport = require('passport');


// Login handle
router.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
    })(req, res, next);
});

// logout handle
router.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;