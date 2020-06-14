const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        dialectOptions: {
            useUTC: false, // for reading from database
        },
        timezone: '+05:30', // for writing to database

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

// test the connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully to database.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.profile = require("../models/profile.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.item = require("../models/item.model.js")(sequelize, Sequelize);
db.user_roles = require("../models/user-roles.model.js")(sequelize, Sequelize);
db.service = require("../models/service.model.js")(sequelize, Sequelize);
db.student_item_request = require("../models/student-item-request.model.js")(sequelize, Sequelize);
db.student_service_request = require("../models/student-service-request.model.js")(sequelize, Sequelize);
db.academic_item_request = require("../models/academic-item-request.model.js")(sequelize, Sequelize);
db.academic_service_request = require("../models/academic-service-request.model.js")(sequelize, Sequelize);

// One User can have several Roles
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "username"
});
// One Role can be taken on by many Users
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "username",
    otherKey: "roleId"
});

// One profile has one user
db.user.hasOne(db.profile, {
    foreignKey: 'username',
    targetKey: 'username'
});
db.profile.belongsTo(db.user, {
    foreignKey: 'username',
    targetKey: 'username'
});

db.ROLES = ["admin", "non-academic", "academic", "student"];

module.exports = db;