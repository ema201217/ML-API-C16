"use strict";
const { Model } = require("sequelize");
const { defaultValidationsRequiredFields, objectValidate } = require("../resource");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      this.hasMany(models.Image, {
        as: "images",    /* product.images */
        foreignKey: "productId",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
      });
    }
  }
  Product.init(
    {
      /* datatypes y validations */
      /* NAME */
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          ...defaultValidationsRequiredFields
        }
      },

      /* PRICE */
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          ...defaultValidationsRequiredFields,
          isInt:objectValidate(true,"Valor invalido")
        }
      },

      /* DISCOUNT */
      discount: {
        type: DataTypes.INTEGER,
        validate: {
          // is:objectValidate(/[0-9]/g,"Valor invalido"),
          isInt:objectValidate(true,"Valor invalido")
        }
      },

      /* DESCRIPTION */
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
          ...defaultValidationsRequiredFields,
          len:objectValidate([20],"Longitud minima 20 caracteres")
        }
      },

      /* CATEGORY ID */
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          ...defaultValidationsRequiredFields,
          isInt:objectValidate(true,"Valor invalido")
        }
      },
    },
    {
      sequelize,
      modelName: "Product",
      paranoid: true,
    }
  );
  return Product;
};
