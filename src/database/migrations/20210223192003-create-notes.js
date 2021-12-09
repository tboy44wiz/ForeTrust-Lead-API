'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      leads_id: {
        type: Sequelize.STRING
      },
      staff_id: {
        type: Sequelize.STRING
      },
      staff_name: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.TEXT
      },
      contact_mode: {
        type: Sequelize.ENUM('None', 'Call', 'Text Message', 'Zoom', 'WhatsApp', 'Email', 'Physical Meetup', 'Others'),
        default: 'None'
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
    await queryInterface.dropTable('Notes');
  }
};
