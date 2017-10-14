var FlashBurstTemperature = require('../../../database/models/dataFlashBurst/flashBurstTemperature');

var exportObj = {};

// get all
exportObj.findAllFlashBurstTemperature = function (){
  return FlashBurstTemperature.findAll();
};

// get one
exportObj.getFlashBurstTemperatureById = function (id){
  return FlashBurstTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addFlashBurstTemperature = function (flashBurstTemperature){
  return FlashBurstTemperature.create(flashBurstTemperature);
};

module.exports = exportObj;

