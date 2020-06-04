const controller = require("../controllers/service.controller");

module.exports = function (app) {
  // Create a new service
  app.post("/api/services/create", controller.create);

  // Retrieve all services
  app.get("/api/services/getall", controller.findAll);

  // Retrieve all published services
  app.get("/api/services/available", controller.findAllAvailable);

  // Retrieve a single services with service_no
  app.get("/api/services/:service_no", controller.findOne);

  // Update a service with service_no
  app.put("/api/services/update/:service_no", controller.update);

  // Delete a service with service_no
  app.delete("/api/services/remove/:service_no", controller.delete);

  // Delete all services
  app.delete("/api/services/removeall", controller.deleteAll);
};
