const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// middleware port
var corsOptions = {
    origin: "http://localhost:3000"
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

/* Reset database - Delete all records */
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });


// test route
app.get("/", (req, res) => {
    res.json({ message: "InvSys Server Running..." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/item.routes')(app);

// port 5000 for the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));

// create roles in database
function initial() {
    Role.create({
        id: 1,
        name: "admin"
    });

    Role.create({
        id: 2,
        name: "non-academic"
    });

    Role.create({
        id: 3,
        name: "academic"
    });

    Role.create({
        id: 4,
        name: "student"
    });
}