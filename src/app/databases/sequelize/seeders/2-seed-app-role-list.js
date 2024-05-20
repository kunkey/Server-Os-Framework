'use strict';

/** @type {import('sequelize-cli').Migration} */

const tableName = "App_Role_List";

module.exports = {
  // inseft data
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      tableName, // table name
      [
        {
          id: 1,
          role_name: "Nomal Member",
          role_permisstions_id: 1
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