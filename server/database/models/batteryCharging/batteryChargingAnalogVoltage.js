'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('batteryChargingAnalogVoltage', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  voltage: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  timestamp: {
    type: Sequelize.INTEGER,
    allowNull:fase
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
