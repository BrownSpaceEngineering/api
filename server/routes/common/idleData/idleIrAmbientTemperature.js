var IdleIrAmbientTemperature = require('../../../database/models/idleData/idleIrAmbientTemperature');

var exportObj = {};

// get all
exportObj.findAllIdleIrAmbientTemperature = function (){
  return IdleIrAmbientTemperature.findAll();
};

// get one
exportObj.getIdleIrAmbientTemperatureById = function (id){
  return IdleIrAmbientTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addIdleIrAmbientTemperature = function (idleIrAmbientTemperature){
  return IdleIrAmbientTemperature.create(idleIrAmbientTemperature);
};

module.exports = exportObj;
