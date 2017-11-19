var IdleImuTemperature = require('../../../database/models/idleData/idleImuTemperature');

var exportObj = {};

// get all
exportObj.findAllIdleImuTemperature = function (){
  return IdleImuTemperature.findAll();
};

// get one
exportObj.getIdleImuTemperatureById = function (id){
  return IdleImuTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addIdleImuTemperature = function (idleImuTemperature){
  return IdleImuTemperature.create(idleImuTemperature);
};

module.exports = exportObj;
