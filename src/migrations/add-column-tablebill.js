module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'bills',
        'name',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'bills',
        'phoneNumber',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'bills',
        'email',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'bills',
        'address',
        {
          type: Sequelize.STRING
        }
      ),
      
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('bills', 'name'),
      queryInterface.removeColumn('bills', 'email'),
      queryInterface.removeColumn('bills', 'address')
    ]);
  }
};