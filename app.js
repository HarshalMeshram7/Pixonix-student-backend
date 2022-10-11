require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const favicon = require("static-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/schema");
const v1_routes = require("./routes/v1.routes");
const app = express();
const port = process.env.PORT || 8080;
require("./mail/transporter");

// swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-dev-api.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/v1", v1_routes);
app.get("/", (req, res) => {
  res.render("index", {
    title: "Maritime-Academy",
    message: "Welcome to Maritime-Academy Backend Services",
  });
});

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

db.Sequelize.sync();
// db.Sequelize.sync({ alter: true }).then(() => {
//    console.log("Drop and re-sync db.");
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message);
  res.json(err.message);
});

// Start the server
var server = app.listen(port, () => {
  console.log("Server running on port", port);
});
server.timeout = 0;

module.exports = app;
