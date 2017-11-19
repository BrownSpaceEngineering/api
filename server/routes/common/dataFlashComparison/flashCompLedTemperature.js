var FlashCompLedTemperature = require('../../../database/models/dataFlashComparison/flashCompLedTemperature');

var exportObj = {};

// get all
exportObj.findAllFlashCompLedTemperature = function (){
  return FlashCompLedTemperature.findAll();
};

// get one
exportObj.getFlashCompLedTemperatureById = function (id){
  return FlashCompLedTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addFlashCompLedTemperature = function (flashCompLedCurrent){
  return FlashCompLedTemperature.create(flashCompLedCurrent);
};

module.exports = exportObj;
