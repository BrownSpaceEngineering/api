var FlashCompLedCurrent = require('../../../database/models/dataFlashComparison/flashCompLedCurrent');

var exportObj = {};

// get all
exportObj.findAllFlashCompLedCurrent = function (){
  return FlashCompLedCurrent.findAll();
};

// get one
exportObj.getFlashCompLedCurrentById = function (id){
  return FlashCompLedCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addFlashCompLedCurrent = function (flashCompLedCurrent){
  return FlashCompLedCurrent.create(flashCompLedCurrent);
};

module.exports = exportObj;
