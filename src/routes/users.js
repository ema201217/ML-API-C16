// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const { update, remove, image } = require("../controllers/usersController");
const { checkToken } = require("../middlewares");

router
  /* UPDATE USER */
  .patch("/", checkToken, update)

  /* DELETE USER */
  .delete("/:id?",remove)

  /* PREVIEW IMAGE */
  .get("/image/:img", image);

module.exports = router;
