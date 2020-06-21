const controller = require("../controllers/reviewed-item-req.controller");

module.exports = function (app) {
    // Create a new approval/disapproval
    app.post("/api/review-item/create", controller.create);

    // Retrieve all approved requests
    app.get("/api/review-item/approved", controller.findAllApproved);

    // Retrieve all approved requests
    app.get("/api/review-item/issued", controller.findAllIssued);

    // Retrieve all approved requests
    app.get("/api/review-item/get/:requestId", controller.findOne);

    // Update a request with requestId
    app.put("/api/review-item/update/:requestId", controller.update);
};