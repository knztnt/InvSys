const controller = require("../controllers/student-service-request.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/service/req/create", controller.create);
};