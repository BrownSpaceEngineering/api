var Sequelize = require('sequelize');
var config = require('../../dbConfig.js');

var url = config.dialect + "://" + config.username + ":" + config.password + "@" + config.host + ":" + config.port + "/" + config.database;

module.exports = new Sequelize(url, {
  logging: false,
  native: true
})
