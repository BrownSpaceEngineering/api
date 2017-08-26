var CurrImuGyroscope = require('../../../database/models/currentData/imu/currImuGyroscope');

var exportObj = {};

// get all
exportObj.findAllCurrImuGyroscope = function (){
  return CurrImuGyroscope.findAll();
};

// get one
exportObj.getCurrImuGyroscopeById = function (id){
  return CurrImuGyroscope.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrImuGyroscope = function (currImuGyroscope){
  return CurrImuGyroscope.create(currImuGyroscope);
};

module.exports = exportObj;

