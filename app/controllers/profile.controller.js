const db = require("../models");
const Profile = db.profile;

const Op = db.Sequelize.Op;


// Retrieve all users
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

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

// // Find a single Item with an item_no
// exports.findOne = (req, res) => {
//     const item_no = req.params.item_no;

//     Item.findByPk(item_no)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error retrieving Item with item number = " + item_no
//             });
//         });
// };

// const t = db.sequelize.transaction();

// // Update a Item by the item_no in the request
// exports.update = (req, res) => {
//     const item_no = req.params.item_no;

//     try {
//         Item.update(req.body.data, {
//             where: { item_no: item_no }
//         }, { transaction: t })
//             .then(num => {
//                 if (num == 1) {
//                     res.send({
//                         message: "Item was updated successfully."
//                     });
//                 } else {
//                     res.send({
//                         message: `Cannot update Item with item_no=${item_no}. Maybe Item was not found or req.body is empty!`
//                     });
//                 }
//                 // commit the transaction.
//                 t.commit();
//             })
//             .catch(err => {
//                 res.status(500).send({
//                     message: "Error updating Item with item_no=" + item_no
//                 });
//             });
//     } catch (error) {
//         // If the execution reaches this line, an error was thrown.
//         // rollback the transaction.
//         t.rollback();

//     }
// };

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