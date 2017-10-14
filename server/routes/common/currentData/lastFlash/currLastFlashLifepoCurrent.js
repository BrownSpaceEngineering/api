var CurrLastFlashLifepoCurrent = require('../../../../database/models/currentData/lastFlash/currLastFlashLifepoCurrent');

var exportObj = {};

// get all
exportObj.findAllCurrLastFlashLifepoCurrent = function (){
  return CurrLastFlashLifepoCurrent.findAll();
};

// get one
exportObj.getCurrLastFlashLifepoCurrentById = function (id){
  return CurrLastFlashLifepoCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrLastFlashLifepoCurrent = function (currLastFlashLifepoCurrent){
  return CurrLastFlashLifepoCurrent.create(currLastFlashLifepoCurrent);
};

module.exports = exportObj;

