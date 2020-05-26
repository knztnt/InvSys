const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/student",
        [authJwt.verifyToken, authJwt.isStudent],
        controller.studentBoard
    );

    app.get(
        "/api/test/academic",
        [authJwt.verifyToken, authJwt.isAcademic],
        controller.academicBoard
    );

    app.get(
        "/api/test/non-academic",
        [authJwt.verifyToken, authJwt.isNonAc],
        controller.nonacademicBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};