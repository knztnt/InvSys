const controller = require("../controllers/student-item-request.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/item/req/create", controller.create);

    // Retrieve all Items
    app.get("/api/item/req/getall", controller.findAll);

    // Retrieve all published Items
    app.get("/api/item/req/reviewed", controller.findAllReviewed);

    // Retrieve a single Item with requestId
    app.get("/api/item/req/:requestId", controller.findOne);

    // Update a Item with requestId
    app.put("/api/item/req/update/:requestId", controller.update);

};