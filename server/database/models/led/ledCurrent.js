'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('ledCurrent', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  current: {
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
