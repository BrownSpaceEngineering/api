var FlashBurstLedCurrent = require('../../../database/models/dataFlashBurst/flashBurstLedCurrent');

var exportObj = {};

// get all
exportObj.findAllFlashBurstLedCurrent = function (){
  return FlashBurstLedCurrent.findAll();
};

// get one
exportObj.getFlashBurstLedCurrentById = function (id){
  return FlashBurstLedCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addFlashBurstLedCurrent = function (flashBurstLedCurrent){
  return FlashBurstLedCurrent.create(flashBurstLedCurrent);
};

module.exports = exportObj;
