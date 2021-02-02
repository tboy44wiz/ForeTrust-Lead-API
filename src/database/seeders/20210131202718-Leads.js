'use strict';

import {v4 as uuidV4} from "uuid";
import bcrypt from "bcryptjs";

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

    await queryInterface.bulkInsert('Leads', [
      {
        id: uuidV4(),
        staff_id: uuidV4(),
        leads_name: 'John Deo',
        leads_phone: '08033407000',
        leads_email: 'john_deo@yahoo.com',
        leads_address: '21 Alen Avenue, Western District',
        leads_state: 'New York',
        purpose: 'Software development enquiry.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        staff_id: uuidV4(),
        leads_name: 'Jane Deo',
        leads_phone: '08033407000',
        leads_email: 'jane_deo@yahoo.com',
        leads_address: '6B James Robertson, Masha.',
        leads_state: 'California',
        purpose: 'Official company visit.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Leads', null, {});
  }
};
