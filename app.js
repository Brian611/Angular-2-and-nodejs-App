const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require('morgan')


const config = require("./config/database");
const index = require("./routes/index");
const api = require("./routes/api");
const user = require("./routes/user");

const port = 3000;

mongoose.connect(config.database);

mongoose.connection.on("open", () => {
    console.log("MongoDB connected at : " + config.database);
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB error : " + err);
});

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//routes
app.use('/', index);
app.use('/api', api);
app.use('/api/users', user);

app.listen(port, "localhost", (error) => {
    if (error) {
        console.error("Unable to listen on port", port, error);
        listen(port + 1);
        return;
    }
    console.log("open http://localhost:" + port + "/");
});
