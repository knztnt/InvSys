const controller = require("../controllers/student-service-request.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/service/req/create", controller.create);

    // Retrieve all Items
    app.get("/api/service/req/getall", controller.findAll);

    // Retrieve all published Items
    app.get("/api/service/req/reviewed", controller.findAllReviewed);

    // Retrieve a single Item with requestId
    app.get("/api/service/req/:requestId", controller.findOne);

    // Update a Item with requestId
    app.put("/api/service/req/update/:requestId", controller.update);

    // Retrieve all requests by sudentId
    app.get("/api/service/req/getall/student", controller.findByStudId);

    // Retrieve all requests by StaffId
    app.get("/api/service/req/getall/academic", controller.findByAcId);
};