var RadioTransmissionLionVoltage = require('../../../database/models/dataRadioTransmission/radioTransmissionLionVoltage');

var exportObj = {};

// get all
exportObj.findAllRadioTransmissionLionVoltage = function (){
  return RadioTransmissionLionVoltage.findAll();
};

// get one
exportObj.getRadioTransmissionLionVoltageById = function (id){
  return RadioTransmissionLionVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addRadioTransmissionLionVoltage = function (radioTransmissionLionVoltage){
  return RadioTransmissionLionVoltage.create(radioTransmissionLionVoltage);
};

module.exports = exportObj;
