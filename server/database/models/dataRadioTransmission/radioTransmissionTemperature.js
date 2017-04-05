'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('radioTransmissionTemperature', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  temperature: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  timestamp: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
