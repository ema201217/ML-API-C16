"use strict";
const { Model } = require("sequelize");
const { ROL_USER } = require("../../constants");


module.exports = (sequelize, DataTypes) => {
  class User extends Model {

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
      },

      // SURNAME
      surname: {
        type: DataTypes.STRING,
      },

      // EMAIL
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      // PASSWORD
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // AVATAR
      avatar: {
        type: DataTypes.STRING,
        defaultValue: "default.png",
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
