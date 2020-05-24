const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.username = decoded.username;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.username).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isNonAc = (req, res, next) => {
    User.findByPk(req.username).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "non-academic") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Non-Academic Role!"
            });
        });
    });
};

isAcademic = (req, res, next) => {
    User.findByPk(req.username).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "academic") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Academic Role!"
            });
        });
    });
};

isStudent = (req, res, next) => {
    User.findByPk(req.username).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "student") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Student Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isNonAc: isNonAc,
    isAcademic: isAcademic,
    isStudent: isStudent
};

module.exports = authJwt;