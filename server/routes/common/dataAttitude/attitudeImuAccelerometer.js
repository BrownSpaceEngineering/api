var AttitudeImuAccelerometer = require('../../../database/models/dataAttitude/attitudeImuAccelerometer');

var exportObj = {};

// get all
exportObj.findAllAttitudeImuAccelerometer = function (){
  return AttitudeImuAccelerometer.findAll();
};

// get one
exportObj.getAttitudeImuAccelerometerById = function (id){
  return AttitudeImuAccelerometer.findOne({ where: { id:id } });
};

// add one
exportObj.addAttitudeImuAccelerometer = function (attitudeImuAccelerometer){
  return AttitudeImuAccelerometer.create(attitudeImuAccelerometer);
};

module.exports = exportObj;

