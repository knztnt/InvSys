const controller = require("../controllers/reviewed-service-req.controller");

module.exports = function (app) {
    // Create a new approval/disapproval
    app.post("/api/review-service/create", controller.create);

    // Retrieve all approved requests
    app.get("/api/review-service/approved", controller.findAllApproved);

    // Update a request with requestId
    app.put("/api/review-service/update/:requestId", controller.update);
};