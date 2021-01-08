'use strict';

import { v4 as uuidV4 } from 'uuid';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Staff', [{
      id: uuidV4(),
      staff_name: 'Admin',
      staff_email: 'admin@gmail.com',
      staff_phone: '08033407000',
      staff_password: 'password123',
      staff_location: 'Lagos',
      staff_role: 'Admin'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Staff', null, {});
  }
};
