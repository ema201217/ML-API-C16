const { adminNotAutoDestroy } = require("./adminNotAutoDestroy");
const { checkToken } = require("./checkToken");
const { uploadImageAvatar, uploadImageProduct } = require("./uploadFiles");

module.exports = {
  uploadImageProduct,
  uploadImageAvatar,
  adminNotAutoDestroy,
  checkToken,
};
