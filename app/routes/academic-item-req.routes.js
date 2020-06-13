const controller = require("../controllers/academic-item-request.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/item/ac/req/create", controller.create);
};