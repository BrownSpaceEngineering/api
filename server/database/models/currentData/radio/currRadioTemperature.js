'use strict';

var Sequelize = require('sequelize');

var db = require('../../../_db');

module.exports = db.define('currRadioTemperature', {
  temperature: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
