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
  err /* credenciales incalidas */,
  res,
  codeStatus = /sequelize/i.test(err.name) ? 422 : 500 /* 404 */
) => {
  /* console.log(err); */

  let prop = "error";
  let responseError;

  if (err.message) {
    responseError = err.message;
  }

  if (/sequelize/i.test(err.name) && Array.isArray(err.errors)) {
    prop += "s";
    responseError = mapped(err.errors);
  }

  /* if(err instanceof Object){

  } */
  /*  if(typeof err === 'object'){
  
} */


  if (typeof err === "string") {
    responseError = err;
  }

  return res.status(codeStatus).json({
    ok: false,
    status: codeStatus,
    [prop]: responseError,
  });
};

module.exports = { sendJsonError };
