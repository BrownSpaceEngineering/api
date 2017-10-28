var IdleRadioTemperature = require('../../../database/models/idleData/idleRadioTemperature');

var exportObj = {};

// get all
exportObj.findAllIdleRadioTemperature = function (){
  return IdleRadioTemperature.findAll();
};

// get one
exportObj.getIdleRadioTemperatureById = function (id){
  return IdleRadioTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addIdleRadioTemperature = function (idleRadioTemperature){
  return IdleRadioTemperature.create(idleRadioTemperature);
};

module.exports = exportObj;
