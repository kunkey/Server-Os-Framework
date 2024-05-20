'use strict';

const PwdValidate = require("../../../utils/string/password");

const tableName = "App_User";

module.exports = {
  // inseft data
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      tableName, // table name
      [
        {
          name: "name_demo",
          username: "username_demo",
          email: "email_demo",
          phone: "+8483611678",
          password: PwdValidate.generatePassword("password_demo"),
          role: 1,
          balance: 250000,
          status: "active",
          verify: true,
          createdAt: new Date('2024-05-01T00:00:00.000Z'),
          updatedAt: new Date('2024-06-01T00:00:00.000Z')
        },
      ], {
      // options for bulkInsert
    });
  },
  // rollback when fail.
  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete(tableName, null, {});
  }
};
