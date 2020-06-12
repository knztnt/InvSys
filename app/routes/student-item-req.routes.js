const controller = require("../controllers/student-item-request.controller");

module.exports = function (app) {
    // Create a new request
    app.post("/api/item/req/create", controller.create);
};