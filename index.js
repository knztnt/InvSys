const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
// port 5000 for the server
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const Users = require("./routes/authRoutes");

app.use("/users", Users);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
