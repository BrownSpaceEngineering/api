var FlashBurstLifepoVoltage = require('../../database/models/dataFlashBurst/flashBurstLifepoVoltage');

var exportObj = {};

// get all
exportObj.findAllFlashBurstLifepoVoltage = function (){
  return FlashBurstLifepoVoltage.findAll();
};

// get one
exportObj.getFlashBurstLifepoVoltageById = function (id){
  return FlashBurstLifepoVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addFlashBurstLifepoVoltage = function (flashBurstLifepoVoltage){
  return FlashBurstLifepoVoltage.create(flashBurstLifepoVoltage);
};

module.exports = exportObj;

