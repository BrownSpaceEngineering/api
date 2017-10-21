var Sequelize = require('sequelize');
var url;
if(process.env.LOCAL_DB){
  url = 'postgres://localhost:5432/bse_api';
} else if (process.env.TEST_DB) {
  url = 'postgres://localhost:5432/bse_api_test';
} else {
  var config = require('../../dbConfig.js');
  url = config.dialect + "://" + config.username + ":" + config.password + "@" + config.host + ":" + config.port + "/" + config.database;
}

module.exports = new Sequelize(url, {
  logging: false,
  native: true
})
