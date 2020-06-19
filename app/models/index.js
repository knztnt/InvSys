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
db.reviewed_item_request = require("../models/reviewed-item-req.model.js")(sequelize, Sequelize);
db.reviewed_service_request = require("../models/reviewed-service-req.model.js")(sequelize, Sequelize);
db.issued_aca_item_request = require("./issued-aca-item.model.js")(sequelize, Sequelize);
db.proceeded_aca_service = require("./proceeded-aca-service.model.js")(sequelize, Sequelize);
db.issued_stud_item_request = require("./issued-stud-item.model.js")(sequelize, Sequelize);
db.proceeded_stud_service = require("./proceeded-stud-service.model.js")(sequelize, Sequelize);

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

// one item has many requests
db.item.hasMany(db.student_item_request, {
    foreignKey: 'item_no',
    targetKey: 'item_no'
});
db.student_item_request.belongsTo(db.item, {
    foreignKey: 'item_no',
    targetKey: 'item_no'
});

db.item.hasMany(db.academic_item_request, {
    foreignKey: 'item_no',
    targetKey: 'item_no'
});
db.academic_item_request.belongsTo(db.item, {
    foreignKey: 'item_no',
    targetKey: 'item_no'
});


// one service has many requests
db.service.hasMany(db.student_service_request, {
    foreignKey: 'service_no',
    targetKey: 'service_no'
});
db.student_service_request.belongsTo(db.service, {
    foreignKey: 'service_no',
    targetKey: 'service_no'
});

db.service.hasMany(db.academic_service_request, {
    foreignKey: 'service_no',
    targetKey: 'service_no'
});
db.academic_service_request.belongsTo(db.service, {
    foreignKey: 'service_no',
    targetKey: 'service_no'
});


// one student can have many requests
db.user.hasMany(db.student_item_request, {
    foreignKey: 'studentId',
    targetKey: 'studentId'
});
db.student_item_request.belongsTo(db.user, {
    foreignKey: 'studentId',
    targetKey: 'username'
});

db.user.hasMany(db.student_service_request, {
    foreignKey: 'studentId',
    targetKey: 'studentId'
});
db.student_service_request.belongsTo(db.user, {
    foreignKey: 'studentId',
    targetKey: 'username'
});


// one staff member can have many requests
db.user.hasMany(db.academic_item_request, {
    foreignKey: 'academicId',
    targetKey: 'academicId'
});
db.academic_item_request.belongsTo(db.user, {
    foreignKey: 'academicId',
    targetKey: 'username'
});

db.user.hasMany(db.academic_service_request, {
    foreignKey: 'academicId',
    targetKey: 'academicId'
});
db.academic_service_request.belongsTo(db.user, {
    foreignKey: 'academicId',
    targetKey: 'username'
});

// one request has one review
db.student_item_request.hasOne(db.reviewed_item_request, {
    foreignKey: 'requestId',
    targetKey: 'requestId'
});
db.reviewed_item_request.belongsTo(db.student_item_request, {
    foreignKey: 'requestId',
    targetKey: 'requestId'
});

db.student_service_request.hasOne(db.reviewed_service_request, {
    foreignKey: 'requestId',
    targetKey: 'requestId'
});
db.reviewed_service_request.belongsTo(db.student_service_request, {
    foreignKey: 'requestId',
    targetKey: 'requestId'
});

// one request is issued by one non-ac
db.user.hasOne(db.issued_aca_item_request, {
    foreignKey: 'nonacademicId',
    targetKey: 'nonacademicId'
});
db.issued_aca_item_request.belongsTo(db.user, {
    foreignKey: 'nonacademicId',
    targetKey: 'username'
});

// one request is proceeded by one non-ac
db.user.hasOne(db.proceeded_aca_service, {
    foreignKey: 'nonacademicId',
    targetKey: 'nonacademicId'
});
db.proceeded_aca_service.belongsTo(db.user, {
    foreignKey: 'nonacademicId',
    targetKey: 'username'
});

// one request is issued by one non-ac
db.user.hasOne(db.issued_stud_item_request, {
    foreignKey: 'nonacademicId',
    targetKey: 'nonacademicId'
});
db.issued_stud_item_request.belongsTo(db.user, {
    foreignKey: 'nonacademicId',
    targetKey: 'username'
});

// one request is proceeded by one non-ac
db.user.hasOne(db.proceeded_stud_service, {
    foreignKey: 'nonacademicId',
    targetKey: 'nonacademicId'
});
db.proceeded_stud_service.belongsTo(db.user, {
    foreignKey: 'nonacademicId',
    targetKey: 'username'
});

db.ROLES = ["admin", "non-academic", "academic", "student"];

module.exports = db;