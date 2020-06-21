const db = require("../models");
const ReviewedServiceReq = db.reviewed_service_request;

const Op = db.Sequelize.Op;

// Create and Save a new request
exports.create = (req, res) => {
    // Validate request
    if (!req.body.requestId) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    // Create a Request
    const request = {
        requestId: req.body.requestId,
        remarks: req.body.remarks,
        isApproved: req.body.isApproved
    };

    // Save Request in the database
    ReviewedServiceReq.create(request)
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

// find all approved requests
exports.findAllApproved = (req, res) => {
    ReviewedServiceReq.findAll({ where: { isApproved: true } })
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

    ReviewedServiceReq.update(req.body.data, {
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

// find all issued requests
exports.findAllIssued = (req, res) => {
    ReviewedServiceReq.findAll(
        {
            attributes: ['requestId'],
            where: { isProceeded: true }
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

// Find a single Request with an requestId
exports.findOne = (req, res) => {
    const requestId = req.params.requestId;

    ReviewedServiceReq.findByPk(requestId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Request with item number = " + requestId
            });
        });
};
