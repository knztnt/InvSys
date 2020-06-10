const db = require("../models");
const userRole = db.user_roles;

const Op = db.Sequelize.Op;

// get all academic users
exports.getAllAcademic = (req, res) => {
    userRole.findAll({
        where: {
            roleId: {
                [Op.eq]: 3
            }
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving items."
            });
        });
};