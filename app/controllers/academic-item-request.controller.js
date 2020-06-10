const db = require("../models");
const AcaItemReq = db.academic_item_request;

const Op = db.Sequelize.Op;

// Create and Save a new request
exports.create = (req, res) => {
    // Validate request
    if (!req.body.academicId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Request
    const request = {
        academicId: req.body.academicId,
        item_no: req.body.item_no,
        item_name: req.body.item_name,
        quantity: req.body.quantity,
        description: req.body.description,
        reason: req.body.reason
    };

    // Save Item in the database
    AcaItemReq.create(request)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Request."
            });
        });
};