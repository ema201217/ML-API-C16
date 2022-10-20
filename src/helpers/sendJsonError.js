const mapped = (errors = []) =>
  errors.reduce(
    (acum, error) => ({ ...acum, [error.path]: error.message }),
    {}
  );

/* const mapped = (errors = []) => {
  return errors.reduce((acum,error) => {
    acum = {...acum, [error.path]: error.message }
    return acum
  },{})
} */

const sendJsonError = (
  err /* credenciales invalidas */,
  res,
  codeStatus = /sequelize/i.test(err.name) ? 422 : 500 /* 404 */
) => {
  /* console.log(err); */

  let prop = "error";
  let responseError;

  

  if (/sequelize/i.test(err.name) && Array.isArray(err.errors)) {
    prop += "s";
    responseError = mapped(err.errors);
  }

  else if (err.message) {
    responseError = err.message;
  }

  else if (typeof err === "string") {
    responseError = err;
  }

  return res.status(codeStatus).json({
    ok: false,
    status: codeStatus,
    [prop]: responseError,
  });
};

module.exports = { sendJsonError };
