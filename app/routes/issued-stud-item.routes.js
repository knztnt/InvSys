const controller = require("../controllers/issued-stud-item.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/item/issue/create", controller.create);

    // Retrieve all Items
    app.get("/api/item/issue/getall", controller.findAll);

    // // Update a request with requestId
    // app.put("/api/item/issue/update/:requestId", controller.update);
};