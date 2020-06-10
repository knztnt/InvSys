const controller = require("../controllers/user-role.controller");

module.exports = function (app) {
    // get all academic users
    app.get("/api/users/academic", controller.getAllAcademic);
};