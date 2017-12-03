var BatteryChargingDigitalSignal = require('../../../database/models/batteryCharging/batteryChargingDigitalSignal');

var exportObj = {};

// get all
exportObj.findAllBatteryChargingDigitalSignal = function (){
  return BatteryChargingDigitalSignal.findAll();
};

// get one
exportObj.getBatteryChargingDigitalSignalById = function (id){
  return BatteryChargingDigitalSignal.findOne({ where: { id:id } });
};

// add one
exportObj.addBatteryChargingDigitalSignal = function (batteryChargingDigitalSignal){
  return BatteryChargingDigitalSignal.create(batteryChargingDigitalSignal);
};

module.exports = exportObj;

