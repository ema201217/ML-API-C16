"use strict";
const { Model } = require("sequelize");
const path = require("path");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  Image.init(
    {
      file: DataTypes.STRING,
      productId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Image",
      paranoid: true,
    }
  );

  return Image;
};
