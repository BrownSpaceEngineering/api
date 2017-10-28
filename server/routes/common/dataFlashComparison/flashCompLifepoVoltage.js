var FlashCompLifepoVoltage = require('../../../database/models/dataFlashComparison/flashCompLifepoVoltage');

var exportObj = {};

// get all
exportObj.findAllFlashCompLifepoVoltage = function (){
  return FlashCompLifepoVoltage.findAll();
};

// get one
exportObj.getFlashCompLifepoVoltageById = function (id){
  return FlashCompLifepoVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addFlashCompLifepoVoltage = function (flashCompLifepoVoltage){
  return FlashCompLifepoVoltage.create(flashCompLifepoCurrent);
};

module.exports = exportObj;
