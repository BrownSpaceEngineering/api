var BatteryChargingAnalogVoltage = require('../../../database/models/batteryCharging/batteryChargingAnalogVoltage');

var exportObj = {};

// get all
exportObj.findAllBatteryChargingAnalogVoltage = function (){
  return BatteryChargingAnalogVoltage.findAll();
};

// get one
exportObj.getBatteryChargingAnalogVoltageById = function (id){
  return BatteryChargingAnalogVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addBatteryChargingAnalogVoltage = function (batteryChargingAnalogVoltage){
  return BatteryChargingAnalogVoltage.create(batteryChargingAnalogVoltage);
};

module.exports = exportObj;

