'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('batteryChargingDigitalSignal', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  
  signal: {
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
