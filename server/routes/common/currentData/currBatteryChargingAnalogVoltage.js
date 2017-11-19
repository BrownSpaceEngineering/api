var CurrBatteryChargingAnalogVoltage = require('../../../database/models/currentData/currBatteryChargingAnalogVoltage');

var exportObj = {};

// get all
exportObj.findAllCurrBatteryChargingAnalogVoltage = function (){
  return CurrBatteryChargingAnalogVoltage.findAll();
};

// get one
exportObj.getCurrBatteryChargingAnalogVoltageById = function (id){
  return CurrBatteryChargingAnalogVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrBatteryChargingAnalogVoltage = function (currBatteryChargingAnalogVoltage){
  return CurrBatteryChargingAnalogVoltage.create(currBatteryChargingAnalogVoltage);
};

module.exports = exportObj;

