// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Middlewares Require ************
const { uploadImageProduct, checkToken, checkRol } = require("../middlewares");


// ************ Controller Require ************
const {
  store,
  detail,
  update,
  destroy,
  all,
  image
} = require("../controllers/productsController");

/* /products */

/*** GET ALL PRODUCTS ***/
/* QUERIES: --> 
limit(number),
offset(number),
page(number)
sales(boolean),
salesDiscount(number)
sort(string)
sortBy(string) 
          <--
*/
router

.get("/", all)

/*** GET ONE PRODUCT ***/
.get("/:id", detail)

/*** STORAGE PRODUCT ***/
.post("/", uploadImageProduct.array("images"),checkToken,checkRol, store)
/* 
 *//*** UPDATE PRODUCT ***/
.patch("/:id", uploadImageProduct.array("images"),checkToken,checkRol, update)

/*** DELETE PRODUCT ***/
.delete("/:id",checkToken,checkRol, destroy)

/*** PREVIEW IMAGE ***/
.get("/image/:img", image)

module.exports = router;
