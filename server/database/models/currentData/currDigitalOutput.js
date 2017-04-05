'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('currDigitalOutput', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  output: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
