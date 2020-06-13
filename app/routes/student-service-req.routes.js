const controller = require("../controllers/student-service-request.controller");

module.exports = function (app) {
  // Create a new request
  app.post("/api/service/req/create", controller.create);

  // Retrieve all services requests
  app.get("/api/service/req/getall", controller.findAll);
};
