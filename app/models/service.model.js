// define services table
module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define(
    "services",
    {
      service_no: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      service_name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING(1000),
      },
      availability: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );

  return Service;
};
