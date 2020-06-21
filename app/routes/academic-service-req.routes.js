const controller = require("../controllers/academic-service-request.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/service/ac/req/create", controller.create);

    // Retrieve a single Item with requestId
    app.get("/api/service/ac/req/get/:requestId", controller.findOne);

    // Retrieve all Items
    app.get("/api/service/ac/req/getall", controller.findAll);

    // Update a request with requestId
    app.put("/api/service/ac/req/update/:requestId", controller.update);
};