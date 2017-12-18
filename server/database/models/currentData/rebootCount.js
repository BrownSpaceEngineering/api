'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('rebootCount', {
  count: {
    type: Sequelize.INTEGER,
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
