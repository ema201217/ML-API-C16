"use strict";
const { hashSync } = require("bcryptjs");
const { ID_ADMIN, ROL_ADMIN, ROL_USER, PASSWORD_DEFAULT } = require("../../constants");

const users = [
  {
    id: ID_ADMIN,
    name: "admin",
    surname: "admin",
    email: "admin@gmail.com",
    password: hashSync(process.env.PASSWORD_ADMIN, 12),
    avatar: "default.png",
    rolId: ROL_ADMIN,
    createdAt: new Date(),
  },
  {
    name: "user",
    surname: "user",
    email: "user@gmail.com",
    password: hashSync(PASSWORD_DEFAULT, 12),
    avatar: "default.png",
    rolId: ROL_USER,
    createdAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
