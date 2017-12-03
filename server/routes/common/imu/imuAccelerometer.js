var ImuAccelerometer = require('../../../database/models/imu/imuAccelerometer');

var exportObj = {};

// get all
exportObj.findAllImuAccelerometer = function (){
  return ImuAccelerometer.findAll();
};

// get one
exportObj.getImuAccelerometerById = function (id){
  return ImuAccelerometer.findOne({ where: { id:id } });
};

// add one
exportObj.addImuAccelerometer = function (imuAccelerometer){
  return ImuAccelerometer.create(imuAccelerometer);
};

module.exports = exportObj;

