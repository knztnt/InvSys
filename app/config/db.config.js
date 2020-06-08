module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "devin$$95",
  DB: "invsys",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
