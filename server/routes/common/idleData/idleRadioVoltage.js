var IdleRadioVoltage = require('../../../database/models/idleData/idleRadioVoltage');

var exportObj = {};

// get all
exportObj.findAllIdleRadioVoltage = function (){
  return IdleRadioVoltage.findAll();
};

// get one
exportObj.getIdleRadioVoltageById = function (id){
  return IdleRadioVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addIdleRadioVoltage = function (idleRadioVoltage){
  return IdleRadioVoltage.create(idleRadioVoltage);
};

module.exports = exportObj;
