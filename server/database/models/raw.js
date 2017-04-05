'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('raw', {
  tid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  raw: {
    type: Sequelize.STRING,
    allowNull: false
  }


})
