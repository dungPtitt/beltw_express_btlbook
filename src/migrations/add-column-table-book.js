module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'books',
        'price',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'books',
        'des',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('books', 'price'),
      queryInterface.removeColumn('books', 'des')
    ]);
  }
};