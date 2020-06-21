const controller = require("../controllers/proceeded-stud-service.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/service/proceed/create", controller.create);

    // Retrieve all Items
    app.get("/api/service/proceed/getall", controller.findAll);

    // // Update a request with requestId
    // app.put("/api/service/proceed/update/:requestId", controller.update);
};