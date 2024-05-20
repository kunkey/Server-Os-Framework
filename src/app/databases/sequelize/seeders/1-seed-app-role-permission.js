'use strict';

/** @type {import('sequelize-cli').Migration} */

const tableName = "App_Role_Permission";

module.exports = {
  // inseft data
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      tableName, // table name
      [
        {
          id: 1,
          permission_name: "Full Access",
          permissions_allow: JSON.stringify({
            viewPage: true,
            viewPageLimit: true
          })
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