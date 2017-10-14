var CurrIrReading = require('../../../database/models/currentData/currIrReading');

var exportObj = {};

// get all
exportObj.findAllCurrIrReading = function (){
  return CurrIrReading.findAll();
};

// get one
exportObj.getCurrIrReadingById = function (id){
  return CurrIrReading.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrIrReading = function (currIrReading){
  return CurrIrReading.create(currIrReading);
};

module.exports = exportObj;

