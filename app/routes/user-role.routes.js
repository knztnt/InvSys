const controller = require("../controllers/user-role.controller");

module.exports = function (app) {
    // get all academic users
    app.get("/api/users/academic", controller.getAllAcademic);

    // get all non-academic users
    app.get("/api/users/non-academic", controller.getAllNonAcademic);

    // get all academic users
    app.get("/api/users/student", controller.getAllStudent);

    // get all academic users
    app.get("/api/users/admin", controller.getAllAdmin);
};