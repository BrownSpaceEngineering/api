var Sequelize = require('sequelize');
var url = process.env.DB_URL;
var user = process.env.DB_USER;
var pw = process.env.DB_PASSWORD;

module.exports = new Sequelize(url, {
  username: user,
  password: pw,
  logging: false,
  native: true
})
