const objectValidate = (args, msg) => ({ args, msg });

const defaultValidationsRequiredFields = {
  notNull: objectValidate(true,"Campo requerido"),
  notEmpty: objectValidate(true,"Campo requerido"),
}

module.exports = { objectValidate, defaultValidationsRequiredFields }