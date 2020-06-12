const db = require("../models");
const StudServiceReq = db.student_service_request;

const Op = db.Sequelize.Op;

// Create and Save a new request
exports.create = (req, res) => {
    // Validate request
    if (!req.body.studentId) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    // Create a Request
    const request = {
        studentId: req.body.studentId,
        service_no: req.body.service_no,
        service_name: req.body.service_name,
        description: req.body.description,
        staffId: req.body.staffId,
        reason: req.body.reason
    };

    // Save Request in the database
    StudServiceReq.create(request)
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