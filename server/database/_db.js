var Sequelize = require('sequelize');
var url = process.env.DB_URL;

// var config = require('../../dbConfig.js');
// url = config.dialect + "://" + config.username + ":" + config.password + "@" + config.host + ":" + config.port + "/" + config.database;


module.exports = new Sequelize(url, {
  logging: false,
  native: true
})
