var CurrRadioTemperature = require('../../../database/models/currentData/radio/currRadioTemperature');

var exportObj = {};

// get all
exportObj.findAllCurrRadioTemperature = function (){
  return CurrRadioTemperature.findAll();
};

// get one
exportObj.getCurrRadioTemperatureById = function (id){
  return CurrRadioTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrRadioTemperature = function (currRadioTemperature){
  return CurrRadioTemperature.create(currRadioTemperature);
};

module.exports = exportObj;

