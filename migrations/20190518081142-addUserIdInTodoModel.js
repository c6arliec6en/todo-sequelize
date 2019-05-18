'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'userId', { type: Sequelize.INTEGER, allowNull: false })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'userId')
  }
}
