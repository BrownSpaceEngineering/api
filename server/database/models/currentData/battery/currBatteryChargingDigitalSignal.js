'use strict';

var Sequelize = require('sequelize');

var db = require('../../../_db');

module.exports = db.define('currBatteryChargingDigitalSignal', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  signal: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
