var RadioTransmissionTemperature = require('../../database/models/dataRadioTransmission/radioTransmissionTemperature');

var exportObj = {};

// get all
exportObj.findAllRadioTransmissionTemperature = function (){
  return RadioTransmissionTemperature.findAll();
};

// get one
exportObj.getRadioTransmissionTemperatureById = function (id){
  return RadioTransmissionTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addRadioTransmissionTemperature = function (radioTransmissionTemperature){
  return RadioTransmissionTemperature.create(radioTransmissionTemperature);
};

module.exports = exportObj;

