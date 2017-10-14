var FlashBurstLifepoCurrent = require('../../../database/models/dataFlashBurst/flashBurstLifepoCurrent');

var exportObj = {};

// get all
exportObj.findAllFlashBurstLifepoCurrent = function (){
  return FlashBurstLifepoCurrent.findAll();
};

// get one
exportObj.getFlashBurstLifepoCurrentById = function (id){
  return FlashBurstLifepoCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addFlashBurstLifepoCurrent = function (flashBurstLifepoCurrent){
  return FlashBurstLifepoCurrent.create(flashBurstLifepoCurrent);
};

module.exports = exportObj;
