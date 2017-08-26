var CurrLastFlashLedTemperature = require('../../../database/models/currentData/lastFlash/currLastFlashLedTemperature');

var exportObj = {};

// get all
exportObj.findAllCurrLastFlashLedTemperature = function (){
  return CurrLastFlashLedTemperature.findAll();
};

// get one
exportObj.getCurrLastFlashLedTemperatureById = function (id){
  return CurrLastFlashLedTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrLastFlashLedTemperature = function (currLastFlashLedTemperature){
  return CurrLastFlashLedTemperature.create(currLastFlashLedTemperature);
};

module.exports = exportObj;

