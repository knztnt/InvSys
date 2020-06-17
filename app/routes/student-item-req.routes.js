const controller = require("../controllers/student-item-request.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/item/req/create", controller.create);

    // Retrieve all requests
    app.get("/api/item/req/getall", controller.findAll);

    // Retrieve all published requests
    app.get("/api/item/req/reviewed", controller.findAllReviewed);

    // Retrieve a single Item with requestId
    app.get("/api/item/req/:requestId", controller.findOne);

    // Update a Item with requestId
    app.put("/api/item/req/update/:requestId", controller.update);

    // Retrieve all requests by sudentId
    app.get("/api/item/req/getall/student", controller.findByStudId);

    // Retrieve all requests by StaffId
    app.get("/api/item/req/getall/academic", controller.findByAcId);
};