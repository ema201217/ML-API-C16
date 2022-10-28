const { adminNotAutoDestroy } = require("./adminNotAutoDestroy");
const { checkRol } = require("./checkRol");
const { checkToken } = require("./checkToken");
const { uploadImageAvatar, uploadImageProduct } = require("./uploadFiles");

module.exports = {
  uploadImageProduct,
  uploadImageAvatar,
  adminNotAutoDestroy,
  checkToken,
  checkRol
};
