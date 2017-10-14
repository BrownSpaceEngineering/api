var AttitudeImuMagnetometer = require('../../../database/models/dataAttitude/attitudeImuMagnetometer');

var exportObj = {};

// get all
exportObj.findAllAttitudeImuMagnetometer = function (){
  return AttitudeImuMagnetometer.findAll();
};

// get one
exportObj.getAttitudeImuMagnetometerById = function (id){
  return AttitudeImuMagnetometer.findOne({ where: { id:id } });
};

// add one
exportObj.addAttitudeImuMagnetometer = function (attitudeImuMagnetometer){
  return AttitudeImuMagnetometer.create(attitudeImuMagnetometer);
};

module.exports = exportObj;

