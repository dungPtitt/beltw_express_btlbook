'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bills', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      arrIdBook: {
        allowNull: false,
        type: Sequelize.STRING
      },
      arrQuantity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      totalMoney: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bills');
  }
};