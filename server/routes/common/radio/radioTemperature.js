var RadioTemperature = require('../../../database/models/radio/radioTemperature');

var exportObj = {};

// get all
exportObj.findAllRadioTemperature = function (){
  return RadioTemperature.findAll();
};

// get one
exportObj.getRadioTemperature = function (id){
  return RadioTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addRadioTemperature = function (radioTemperature){
  return RadioTemperature.create(radioTemperature);
};

module.exports = exportObj;

