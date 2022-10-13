"use strict";
const { ROL_ADMIN, ROL_USER } = require("../../constants");

const rols = [
  {
    id: ROL_ADMIN,
    name: "admin",
    createdAt: new Date(),
  },
  {
    id: ROL_USER,
    name: "user",
    createdAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Rols", rols, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Rols", null, {});
  },
};
