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
        isApproved: req.body.isApproved,
        reviewedTime: req.body.reviewedTime
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