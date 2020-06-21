const controller = require("../controllers/issued-aca-item.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/item/issue/ac/create", controller.create);

    // Retrieve all Items
    app.get("/api/item/issue/ac/getall", controller.findAll);

    // // Update a request with requestId
    // app.put("/api/item/issue/ac/update/:requestId", controller.update);
};