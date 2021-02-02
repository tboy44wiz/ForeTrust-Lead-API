'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Leads', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      staff_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      leads_name: {
        type: Sequelize.STRING
      },
      leads_phone: {
        type: Sequelize.STRING
      },
      leads_email: {
        type: Sequelize.STRING
      },
      leads_address: {
        type: Sequelize.STRING
      },
      leads_state: {
        type: Sequelize.STRING
      },
      purpose: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Leads');
  }
};
