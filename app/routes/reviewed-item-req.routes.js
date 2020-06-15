const controller = require("../controllers/reviewed-item-req.controller");

module.exports = function (app) {
    // Create a new approval/disapproval
    app.post("/api/item/req/review/create", controller.create);
};