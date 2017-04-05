'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('currIrReading', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  reading: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
