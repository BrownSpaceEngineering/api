'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('currPhotoDiode', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  diode: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
