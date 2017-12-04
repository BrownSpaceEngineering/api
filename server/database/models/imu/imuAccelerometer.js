'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('imuAccelerometer', {
  x: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  y: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  z: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  
  timestamp: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
