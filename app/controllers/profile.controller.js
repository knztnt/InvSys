const db = require("../models");
const Profile = db.profile;

const Op = db.Sequelize.Op;


// Retrieve all users
exports.findAll = (req, res) => {
    const first_name = req.query.first_name;
    var condition = first_name ? { first_name: { [Op.like]: `%${first_name}%` } } : null;

    Profile.findAll({ where: condition })
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

// Find a single profile with a username
exports.findOne = (req, res) => {
    const username = req.params.username;

    Profile.findByPk(username)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Profile with username = " + username
            });
        });
};


// Update a Profile by the username in the request
exports.update = (req, res) => {
    const username = req.params.username;


    Profile.update(req.body.data, {
        where: { username: username }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Profile was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Profile with username=${username}. Maybe Profile was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Profile with username=" + username
            });
        });

};

// // Delete a Item with the specified item_no in the request
// exports.delete = (req, res) => {
//     const item_no = req.params.item_no;

//     Item.destroy({
//         where: { item_no: item_no }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Item was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Item with item_no=${item_no}. Maybe Item was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Item with item_no=" + item_no
//             });
//         });
// };

// // Delete all Items from the database.
// exports.deleteAll = (req, res) => {
//     Item.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//             res.send({ message: `${nums} Items were deleted successfully!` });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while removing all items."
//             });
//         });
// };