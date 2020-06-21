const controller = require("../controllers/academic-item-request.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/item/ac/req/create", controller.create);

    // Retrieve a single Item with requestId
    app.get("/api/item/ac/req/get/:requestId", controller.findOne);

    // Retrieve all Items
    app.get("/api/item/ac/req/getall", controller.findAll);

    // Update a request with requestId
    app.put("/api/item/ac/req/update/:requestId", controller.update);
};