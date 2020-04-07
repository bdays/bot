'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Weather', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city_name: {
        type: Sequelize.STRING,
      },
      temp: {
        type: Sequelize.INTEGER,
      },
      temp_feels_like: {
        type: Sequelize.INTEGER,
      },
      wind_speed: {
        type: Sequelize.INTEGER,
      },
      wind_deg: {
        type: Sequelize.INTEGER,
      },
      dt: {
        type: Sequelize.INTEGER,
      },
      last_update: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Weather');
  },
};
