var IdleBatteryTemperature = require('../../../database/models/idleData/idleBatteryTemperature');

var exportObj = {};

// get all
exportObj.findAllIdleBatteryTemperature = function (){
  return IdleBatteryTemperature.findAll();
};

// get one
exportObj.getIdleBatteryTemperatureById = function (id){
  return IdleBatteryTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addIdleBatteryTemperature = function (idleBatteryTemperature){
  return IdleBatteryTemperature.create(idleBatteryTemperature);
};

module.exports = exportObj;
