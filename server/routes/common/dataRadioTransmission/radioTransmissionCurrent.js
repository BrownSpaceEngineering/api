var RadioTransmissionCurrent = require('../../../../database/models/dataRadioTransmission/radioTransmissionCurrent');

var exportObj = {};

// get all
exportObj.findAllRadioTransmissionCurrent = function (){
  return RadioTransmissionCurrent.findAll();
};

// get one
exportObj.getRadioTransmissionCurrentById = function (id){
  return RadioTransmissionCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addRadioTransmissionCurrent = function (radioTransmissionCurrent){
  return RadioTransmissionCurrent.create(radioTransmissionCurrent);
};

module.exports = exportObj;
