'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('imuAccelerometer', {
  index: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  accelerometer: {
    type: Sequelize.DOUBLE,
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
