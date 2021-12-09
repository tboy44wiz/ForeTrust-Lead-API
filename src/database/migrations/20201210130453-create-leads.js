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
        type: Sequelize.UUID,
      },
      staff_name: {
        allowNull: false,
        type: Sequelize.STRING,
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
      leads_source: {
        type: Sequelize.ENUM('Select Source', 'Friends', 'Email', 'FaceBook', 'Twitter', 'Instagram', 'WhatsApp', 'Television', 'Radio', 'Others'),
        defaultValue: 'Select Source'
      },
      purpose: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Dormant', 'In progress', 'Done'),
        default: 'In progress'
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
