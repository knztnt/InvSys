const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// middleware port
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content type json
app.use(bodyParser.json());

// parse requests of content type x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// database sync
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync();
/*
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});
*/

// test route
app.get("/", (req, res) => {
    res.json({ message: "InvSys Server Running..." });
});

// const Users = require("./routes/authRoutes");
// app.use("/users", Users);

// port 5000 for the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

// create roles in database
function initial() {
    Role.create({
        id: 1,
        name: "Admin"
    });

    Role.create({
        id: 2,
        name: "Non-Academic"
    });

    Role.create({
        id: 3,
        name: "Academic"
    });

    Role.create({
        id: 4,
        name: "Student"
    });
}