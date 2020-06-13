const controller = require("../controllers/student-item-request.controller");

module.exports = function (app) {
  // Create a new request
  app.post("/api/item/req/create", controller.create);

  // Retrieve all item requests
  app.get("/api/item/req/getall", controller.findAll);
};
