var CurrRadioVoltage = require('../../../database/models/currentData/radio/currRadioVoltage');

var exportObj = {};

// get all
exportObj.findAllCurrRadioVoltage = function (){
  return CurrRadioVoltage.findAll();
};

// get one
exportObj.getCurrRadioVoltageById = function (id){
  return CurrRadioVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrRadioVoltage = function (currRadioVoltage){
  return CurrRadioVoltage.create(currRadioVoltage);
};

module.exports = exportObj;

