const { ROL_ADMIN } = require("../constants");
const { sendJsonError } = require("../helpers/sendJsonError");

const checkRol = (req, res, next) => {
  const { rolId } = req.userToken;

  if (rolId !== ROL_ADMIN) {
    return sendJsonError("No tiene permisos para esta acción", res, 403);
  }

  next();
};

module.exports = { checkRol };
