var FlashCompLifepoCurrent = require('../../../database/models/dataFlashComparison/flashCompLifepoCurrent');

var exportObj = {};

// get all
exportObj.findAllFlashCompLifepoCurrent = function (){
  return FlashCompLifepoCurrent.findAll();
};

// get one
exportObj.getFlashCompLifepoCurrentById = function (id){
  return FlashCompLifepoCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addFlashCompLifepoCurrent = function (flashCompLifepoCurrent){
  return FlashCompLifepoCurrent.create(flashCompLifepoCurrent);
};

module.exports = exportObj;
