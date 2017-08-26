'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('preamble', {
  callsign: {
    type: Sequelize.STRING,
    allowNull: false
  },

  timestamp: {
    type: Sequelize.INTEGER
  },

  messageAndOpStates: {
    type: Sequelize.INTEGER,
    allowNull: false

  },

  bytesInError: {
    type: Sequelize.INTEGER

  },

  bytesInMessage: {
    type: Sequelize.INTEGER
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
