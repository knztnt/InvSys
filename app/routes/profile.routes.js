const controller = require("../controllers/profile.controller");

module.exports = function (app) {

    // Retrieve all users
    app.get("/api/profile/getall", controller.findAll);

    // // Retrieve all published Items
    // // app.get("/api/profile/available", controller.findAllAvailable);

    // Retrieve a single Profile with username
    app.get("/api/profile/:username", controller.findOne);

    // Update a Profile with username
    app.put("/api/profile/update/:username", controller.update);

    // // Delete a Profile with username
    // app.delete("/api/profile/remove/:username", controller.delete);

    // // Delete all Profiles
    // app.delete("/api/profile/removeall", controller.deleteAll);
};