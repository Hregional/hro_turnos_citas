var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var logger = require("morgan");

import {
  createTurnRoute,
  getTurnsOfTheDayRoute,
  updateTurnStatusRoute,
  getTurnsReportRoute,
} from "./routes/turnRoutes";

import {
  createAppointmentRoute,
  getAppointmentsRoute,
} from "./routes/appointmentRoutes";

var app = express();
app.use(bodyParser.json());

const MONGO_DB_SERVICE_URL =
  process.env.MONGO_DB_SERVICE_URL || "mongodb://localhost:27017/";

mongoose.connect(`${MONGO_DB_SERVICE_URL}hro-tms-database`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(createTurnRoute);
app.use(getTurnsOfTheDayRoute);
app.use(updateTurnStatusRoute);
app.use(getTurnsReportRoute);
app.use(createAppointmentRoute);
app.use(getAppointmentsRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
