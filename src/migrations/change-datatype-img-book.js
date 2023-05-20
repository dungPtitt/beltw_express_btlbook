module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('books', 'image', {
            //   type: Sequelize.STRING,
              type: Sequelize.BLOB('long'),
              allowNull: false,
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('books', 'image', {
              type: Sequelize.MEDIUMBLOB,
              allowNull: false,
          })
      ])
  }
};