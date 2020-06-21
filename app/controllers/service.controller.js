const db = require("../models");
const Service = db.service;

const Op = db.Sequelize.Op;

// Create and Save a new service
exports.create = (req, res) => {
  // Validate request
  if (!req.body.service_no) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a service
  const service = {
    service_no: req.body.service_no,
    service_name: req.body.service_name,
    description: req.body.description,
    availability: req.body.availability ? req.body.availability : false,
  };

  // Save service in the database
  Service.create(service)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the service.",
      });
    });
};

// Retrieve all services from the database.
exports.findAll = (req, res) => {
  const service_name = req.query.service_name;
  var condition = service_name
    ? { service_name: { [Op.like]: `%${service_name}%` } }
    : null;

  Service.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving services.",
      });
    });
};

// Find a single service with an service_no
exports.findOne = (req, res) => {
  const service_no = req.params.service_no;

  Service.findByPk(service_no)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Service with service number = " + service_no,
      });
    });
};

const t = db.sequelize.transaction(); // intialize transaction

// Update a service by the service_no in the request
exports.update = (req, res) => {
  const service_no = req.params.service_no;

  try {
    Service.update(req.body.data, {
      where: { service_no: service_no },
    }, { transaction: t })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Service was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update service with service_no=${service_no}. Maybe service was not found or req.body is empty!`,
          });
        }
        // commit the transaction.
        t.commit();
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating service with service_no=" + service_no,
        });
      });
  } catch (error) {
    // If the execution reaches this line, an error was thrown.
    // rollback the transaction.
    t.rollback();

  }
};

// Delete a service with the specified service_no in the request
exports.delete = (req, res) => {
  const service_no = req.params.service_no;

  Service.destroy({
    where: { service_no: service_no },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "service was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete service with item_no=${service_no}. Maybe service was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Service with service_no=" + service_no,
      });
    });
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
  Service.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} services were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all services.",
      });
    });
};

// find all available Tutorial
exports.findAllAvailable = (req, res) => {
  Service.findAll({ where: { availability: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};
