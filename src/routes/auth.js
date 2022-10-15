// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Middleware Require ************
const { uploadImageAvatar, checkToken } = require("../middlewares");

// ************ Controller Require ************
const { register, login, getUserAuthenticated } = require("../controllers/authController");


router
  /* POST REGISTER */
  .post("/register", uploadImageAvatar.single("avatar"), register)

  /* POST LOGIN */
  .post("/login", login)

  /* POST LOGIN */
  .get("/me/:token?", checkToken, getUserAuthenticated);

module.exports = router;
