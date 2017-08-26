var CurrImuMagnetometer = require('../../../database/models/currentData/imu/currImuMagnetometer');

var exportObj = {};

// get all
exportObj.findAllCurrImuMagnetometer = function (){
  return CurrImuMagnetometer.findAll();
};

// get one
exportObj.getCurrImuMagnetometerById = function (id){
  return CurrImuMagnetometer.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrImuMagnetometer = function (currImuMagnetometer){
  return CurrImuMagnetometer.create(currImuMagnetometer);
};

module.exports = exportObj;

