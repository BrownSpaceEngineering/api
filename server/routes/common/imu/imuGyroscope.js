var ImuGyroscope = require('../../../database/models/imu/imuGyroscope');

var exportObj = {};

// get all
exportObj.findAllImuGyroscope = function (){
  return ImuGyroscope.findAll();
};

// get one
exportObj.getImuGyroscopeById = function (id){
  return ImuGyroscope.findOne({ where: { id:id } });
};

// add one
exportObj.addImuGyroscope = function (imuGyroscope){
  return ImuGyroscope.create(imuGyroscope);
};

module.exports = exportObj;

