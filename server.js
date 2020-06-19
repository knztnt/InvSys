const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// middleware port
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content type json
app.use(bodyParser.json());

// parse requests of content type x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// database sync
const db = require("./app/models");
const Role = db.role;
var bcrypt = require("bcryptjs");
const User = db.user;
const UserRole = db.user_roles;
db.sequelize.sync();

/* Reset database - Delete all records */
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
//   initial(db.sequelize);
// });

// test route
app.get("/", (req, res) => {
  res.json({ message: "InvSys Server Running..." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/item.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/user-role.routes")(app);
require("./app/routes/student-item-req.routes")(app);
require("./app/routes/student-service-req.routes")(app);
require("./app/routes/academic-item-req.routes")(app);
require("./app/routes/academic-service-req.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/reviewed-item-req.routes")(app);
require("./app/routes/reviewed-service-req.routes")(app);
require("./app/routes/issued-aca-item.routes")(app);
require("./app/routes/issued-stud-item.routes")(app);
require("./app/routes/proceeded-aca-service.routes")(app);
require("./app/routes/proceeded-stud-service.routes")(app);

// port 5000 for the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

// create roles in database
function initial(sequelize) {
  Role.create({
    id: 1,
    name: "admin",
  });

  Role.create({
    id: 2,
    name: "non-academic",
  });

  Role.create({
    id: 3,
    name: "academic",
  });

  Role.create({
    id: 4,
    name: "student",
  });

  User.create({
    username: "admin",
    password: bcrypt.hashSync("admin", 8),
  });

  UserRole.create({
    roleId: 1,
    username: "admin",
  });

  sequelize.query("ALTER TABLE issued_aca_item_requests ADD FOREIGN KEY (requestId) REFERENCES academic_item_requests (requestId);");
  sequelize.query("ALTER TABLE proceeded_aca_service_requests ADD FOREIGN KEY (requestId) REFERENCES academic_service_requests (requestId);");

  sequelize.query("ALTER TABLE issued_stud_item_requests ADD FOREIGN KEY (requestId) REFERENCES reviewed_item_requests (requestId);");
  sequelize.query("ALTER TABLE proceeded_stud_service_requests ADD FOREIGN KEY (requestId) REFERENCES reviewed_service_requests (requestId);");
}
