const controller = require("../controllers/academic-service-request.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/service/ac/req/create", controller.create);
};