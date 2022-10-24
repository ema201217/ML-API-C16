"use strict";
const { Model } = require("sequelize");
const {join} = require("path");
const { defaultValidationsRequiredFields, objectValidate } = require("../resource");
const { unlinkSync } = require("fs");

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
      file: {
        type: DataTypes.STRING,
        defaultValue: "default.png",
      /*   validate: {
          isImage(value){
            if(!/.png|.jpg|.jpeg|.webp/i.test(value)){
              unlinkSync(join(__dirname,`../../../public/images/products/${value}`)) 
              throw new Error("Archivo invalido")
            }
          }
        } */
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          ...defaultValidationsRequiredFields,
          is:objectValidate(/[0-9]/,"Valor invalido"),
          // isInt:objectValidate(true,"Valor invalido")
        },
      },
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Image",
      paranoid: true,
      validate: {
        images(){
          if(!/.png|.jpg|.jpeg|.webp/i.test(this.file)){
            unlinkSync(join(__dirname,`../../../public/images/products/${this.file}`)) 
            throw new Error("Uno o más archivos son invalido")
          }
        }
      }
    }
  );
  return Image;
};
