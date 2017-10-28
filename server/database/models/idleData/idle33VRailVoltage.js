'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

module.exports = db.define('idle33VRailVoltage', {
  voltage: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  tid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }


})
