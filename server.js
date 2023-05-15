const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const noteRoute = require("./route/noteRoute");
const storeRoute = require("./route/store.route");
const bookRoute = require('./route/book.route');
const userRoute = require('./route/user.route');
const loginRoute = require('./route/login.route');
const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//new express version use
//app.use(express.urlencoded({ extended: false }));


// parse application/json
app.use(bodyParser.json());
//new express version use
//app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/api/v1/notes", noteRoute);
app.use("/api/v1/stores", storeRoute);
app.use("/api/v1/books", bookRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/login", loginRoute);

const server = app.listen(4000, () => {
  console.log("SERVER ON ....");
});
