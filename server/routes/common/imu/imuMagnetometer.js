var ImuMagnetometer = require('../../../database/models/imu/imuMagnetometer');

var exportObj = {};

// get all
exportObj.findAllImuMagnetometer = function (){
  return ImuMagnetometer.findAll();
};

// get one
exportObj.getImuMagnetometerById = function (id){
  return ImuMagnetometer.findOne({ where: { id:id } });
};

// add one
exportObj.addImuMagnetometer = function (imuMagnetometer){
  return ImuMagnetometer.create(imuMagnetometer);
};

module.exports = exportObj;

