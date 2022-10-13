"use strict";

const { ID_ADMIN } = require("../../constants");

const addresses = [
  {
    street: "adminStreet 123",
    city: "adminCity",
    province: "adminProvince",
    userId: ID_ADMIN,
    active:true,
    createdAt: new Date(),
  },
  {
    street: "adminStreet2 321",
    city: "adminCity2",
    province: "adminProvince2",
    userId: ID_ADMIN,
    active:false,
    createdAt: new Date(),
  },
  {
    street: "regularStreet 123",
    city: "regularCity",
    province: "regularProvince",
    userId: 2,
    active:true,
    createdAt: new Date(),
  },
  {
    street: "regularStreet2 321",
    city: "regularCity2",
    province: "regularProvince2",
    userId: 2,
    active:false,
    createdAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Addresses", addresses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};
