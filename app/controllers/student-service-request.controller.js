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

// Retrieve all Requests from the database
exports.findAll = (req, res) => {

    StudServiceReq.findAll()
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

// Find a single Request with an requestId
exports.findOne = (req, res) => {
    const requestId = req.params.requestId;

    StudServiceReq.findByPk(requestId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Request with item number = " + requestId
            });
        });
};

// find all reviewed requests
exports.findAllReviewed = (req, res) => {
    StudServiceReq.findAll({ where: { isReviewed: true } })
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

// Update a Request by the requestId in the request
exports.update = (req, res) => {
    const requestId = req.params.requestId;
    StudServiceReq.update(req.body.data, {
        where: { requestId: requestId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Request was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Request with requestId=${requestId}. Maybe Request was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request with requestId=" + requestId
            });
        });
};

// Retrieve all Requests belongs to a given studentId from the database
exports.findByStudId = (req, res) => {
    const studentId = req.query.studentId;
    var condition = studentId ? { studentId: studentId } : null;

    StudServiceReq.findAll({ where: condition })
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

// Retrieve all Requests belongs to a given staffId from the database
exports.findByAcId = (req, res) => {
    const staffId = req.query.staffId;
    var condition = staffId ? { staffId: staffId } : null;

    StudServiceReq.findAll({ where: condition })
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