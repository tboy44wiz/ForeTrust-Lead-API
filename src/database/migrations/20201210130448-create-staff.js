'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Staff', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      staff_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      staff_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      staff_phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      staff_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      staff_location: {
        allowNull: true,
        type: Sequelize.ENUM('Enugu', 'Lagos')
      },
      staff_role: {
        type: Sequelize.ENUM('Admin', 'Staff'),
        defaultValue: 'Staff'
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
    await queryInterface.dropTable('Staff');
  }
};
