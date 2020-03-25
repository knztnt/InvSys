const Sequelize = require('sequelize');
const db = require('../database/db');

// define users table
module.exports = db.sequelize.define(
    'users',
    {
        username: {
            type: Sequelize.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        password: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
);
