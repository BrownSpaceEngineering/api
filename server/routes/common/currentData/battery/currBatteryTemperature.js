var CurrBatteryTemperature = require('../../../../database/models/currentData/battery/currBatteryTemperature');

var exportObj = {};

// get all
exportObj.findAllCurrBatteryTemperature = function (){
  return CurrBatteryTemperature.findAll();
};

// get one
exportObj.getCurrBatteryTemperatureById = function (id){
  return CurrBatteryTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrBatteryTemperature = function (currBatteryTemperature){
  return CurrBatteryTemperature.create(currBatteryTemperature);
};

module.exports = exportObj;

