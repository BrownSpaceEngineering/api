'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('errorInfo', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  errorCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  timestamp: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
