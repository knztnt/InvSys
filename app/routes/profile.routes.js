const controller = require("../controllers/profile.controller");

module.exports = function (app) {

    // Retrieve all users
    app.get("/api/profile/getall", controller.findAll);

    // // Retrieve all published Items
    // // app.get("/api/item/available", controller.findAllAvailable);

    // // Retrieve a single Item with item_no
    // app.get("/api/item/:item_no", controller.findOne);

    // // Update a Item with item_no
    // app.put("/api/item/update/:item_no", controller.update);

    // // Delete a Item with item_no
    // app.delete("/api/item/remove/:item_no", controller.delete);

    // // Delete all Items
    // app.delete("/api/item/removeall", controller.deleteAll);
};