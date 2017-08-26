var CurrLastFlashLedCurrent = require('../../../database/models/currentData/lastFlash/currLastFlashLedCurrent');

var exportObj = {};

// get all
exportObj.findAllCurrLastFlashLedCurrent = function (){
  return CurrLastFlashLedCurrent.findAll();
};

// get one
exportObj.getCurrLastFlashLedCurrentById = function (id){
  return CurrLastFlashLedCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrLastFlashLedCurrent = function (currLastFlashLedCurrent){
  return CurrLastFlashLedCurrent.create(currLastFlashLedCurrent);
};

module.exports = exportObj;

