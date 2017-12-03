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

  messageState: {
    type: Sequelize.INTEGER,
    allowNull: false

  },

  opState: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  bytesInData: {
    type: Sequelize.INTEGER

  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
