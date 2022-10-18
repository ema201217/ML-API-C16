"use strict";
const { Model } = require("sequelize");
const { ROL_USER, IMG_DEFAULT } = require("../../constants");

const {
  objectValidate,
  defaultValidationsRequiredFields,
} = require("../resource");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    existEmail(value) {
      return new Promise((resolve) => {
        const user = User.findOne({ where: { email: value } });
        resolve(user);
      });
    }

    static associate(models) {
      // define association here
      /* Tiene muchas direcciones */
      this.hasMany(models.Address, {
        foreignKey: "userId",
        as: "addresses",
      });
      /* Tiene un rol */
      this.belongsTo(models.Rol, {
        foreignKey: "rolId",
        as: "rol",
      });
    }
  }

  User.init(
    {
      /* datatypes y validations */
      /* NAME */
      name: {
        type: DataTypes.STRING,
        validate: {
          is: objectValidate(/^[a-z]+$/i, "No puede tener números (name)"),
        },
      },

      // SURNAME
      surname: {
        type: DataTypes.STRING,
        validate: {
          is: objectValidate(/^[a-z]+$/i, "No puede tener números (surname)"),
        },
      },

      // EMAIL
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          ...defaultValidationsRequiredFields,

          isEmail: objectValidate(true, "Ingrese un email valido"),

          async email(value) {
            /* email@email.com */
            const exist = await this.existEmail(value);
            if (exist) {
              throw new Error("El email ya existe");
            }
          },
        },
      },

      // PASSWORD
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          ...defaultValidationsRequiredFields,

          isAlphanumeric: objectValidate(
            true,
            "Contraseña invalida, solo números y letras"
          ),
        },
      },

      // AVATAR
      avatar: {
        type: DataTypes.STRING,
        defaultValue: IMG_DEFAULT,
      },

      // ROL ID
      rolId: {
        type: DataTypes.INTEGER,
        valueDefault: ROL_USER,
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );

  return User;
};
