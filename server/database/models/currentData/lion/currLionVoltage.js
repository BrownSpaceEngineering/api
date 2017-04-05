'use strict';

var Sequelize = require('sequelize');

var db = require('../../../_db');

module.exports = db.define('currLionVoltage', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  voltage: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
