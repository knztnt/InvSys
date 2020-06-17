const controller = require("../controllers/reviewed-service-req.controller");

module.exports = function (app) {
    // Create a new approval/disapproval
    app.post("/api/service/req/review/create", controller.create);
};