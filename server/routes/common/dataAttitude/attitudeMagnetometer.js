var AttitudeMagnetometer = require('../../../database/models/dataAttitude/attitudeMagnetometer');

var exportObj = {};

// get all
exportObj.findAllAttitudeMagnetometer = function (){
  return AttitudeMagnetometer.findAll();
};

// get one
exportObj.getAttitudeMagnetometerById = function (id){
  return AttitudeMagnetometer.findOne({ where: { id:id } });
};

// add one
exportObj.addAttitudeMagnetometer = function (attitudeMagnetometer){
  return AttitudeMagnetometer.create(attitudeMagnetometer);
};

module.exports = exportObj;

