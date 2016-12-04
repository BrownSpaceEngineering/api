var Sequelize = require('sequelize');

module.exports = new Sequelize('postgres://localhost:5432/bse_api', {
  logging: false,
  native: true
})
