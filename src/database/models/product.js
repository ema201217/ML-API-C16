"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      this.hasMany(models.Image, {
        as: "images",
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
      },

      /* PRICE */
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      /* DISCOUNT */
      discount: {
        type: DataTypes.INTEGER,
      },

      /* DESCRIPTION */
      description: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      /* CATEGORY ID */
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
