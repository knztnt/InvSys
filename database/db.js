const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize('invsys', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully to database.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;