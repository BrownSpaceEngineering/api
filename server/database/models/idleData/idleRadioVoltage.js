'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('idleRadioVoltage', {
  voltage: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
