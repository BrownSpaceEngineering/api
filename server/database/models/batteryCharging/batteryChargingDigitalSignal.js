'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('batteryChargingDigitalSignal', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  
  signal: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },

  timestamp: {
    type: Sequelize.INTEGER,
    allowNull:false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
