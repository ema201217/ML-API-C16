/* REQUIRES */
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const app = express();

/* Middleware */
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());

/* Routers */
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

/* Routes */
app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => res.status(404).json({ error: "404 Not found" }));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
