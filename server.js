const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content type json
app.use(bodyParser.json());

// parse requests of content type x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// test route
app.get("/", (req, res) => {
    res.json({ message: "InvSys Server Running..." });
});

const Users = require("./routes/authRoutes");
app.use("/users", Users);

// port 5000 for the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
