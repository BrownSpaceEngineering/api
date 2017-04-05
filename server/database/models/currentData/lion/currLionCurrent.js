'use strict';

var Sequelize = require('sequelize');

var db = require('../../../_db');

module.exports = db.define('currLionCurrent', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  current: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
