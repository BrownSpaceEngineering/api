'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('temperature', {
  value: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },

  time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW()
  }


})
