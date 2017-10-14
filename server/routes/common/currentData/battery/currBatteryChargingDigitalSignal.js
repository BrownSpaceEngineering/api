var CurrBatteryChargingDigitalSignal = require('../../../../database/models/currentData/battery/currBatteryChargingDigitalSignal');

var exportObj = {};

// get all
exportObj.findAllCurrBatteryChargingDigitalSignal = function (){
  return CurrBatteryChargingDigitalSignal.findAll();
};

// get one
exportObj.getCurrBatteryChargingDigitalSignalById = function (id){
  return CurrBatteryChargingDigitalSignal.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrBatteryChargingDigitalSignal = function (currBatteryChargingDigitalSignal){
  return CurrBatteryChargingDigitalSignal.create(currBatteryChargingDigitalSignal);
};

module.exports = exportObj;

