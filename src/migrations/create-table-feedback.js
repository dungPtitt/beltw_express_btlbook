'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feedbacks', {
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
      idBook: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      starRate: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comment: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('feedbacks');
  }
};