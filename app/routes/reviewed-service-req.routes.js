const controller = require("../controllers/reviewed-service-req.controller");

module.exports = function (app) {
    // Create a new approval/disapproval
    app.post("/api/review-service/create", controller.create);
};