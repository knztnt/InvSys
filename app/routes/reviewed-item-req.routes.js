const controller = require("../controllers/reviewed-item-req.controller");

module.exports = function (app) {
    // Create a new approval/disapproval
    app.post("/api/review-item/create", controller.create);
};