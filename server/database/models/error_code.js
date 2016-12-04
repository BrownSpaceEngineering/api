'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('error', {
  value: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      len: [5,5]
    }
  }


})
