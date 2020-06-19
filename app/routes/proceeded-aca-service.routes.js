const controller = require("../controllers/proceeded-aca-service.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/service/proceed/ac/create", controller.create);

    // Retrieve all Items
    app.get("/api/service/proceed/ac/getall", controller.findAll);

    // // Update a request with requestId
    // app.put("/api/service/proceed/ac/update/:requestId", controller.update);
};