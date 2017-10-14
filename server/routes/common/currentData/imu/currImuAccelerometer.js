var CurrImuAccelerometer = require('../../../../database/models/currentData/imu/currImuAccelerometer');

var exportObj = {};

// get all
exportObj.findAllCurrImuAccelerometer = function (){
  return CurrImuAccelerometer.findAll();
};

// get one
exportObj.getCurrImuAccelerometerById = function (id){
  return CurrImuAccelerometer.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrImuAccelerometer = function (currImuAccelerometer){
  return CurrImuAccelerometer.create(currImuAccelerometer);
};

module.exports = exportObj;

