var CurrLionVoltage = require('../../../database/models/currentData/lion/currLionVoltage');

var exportObj = {};

// get all
exportObj.findAllCurrLionVoltage = function (){
  return CurrLionVoltage.findAll();
};

// get one
exportObj.getCurrLionVoltageById = function (id){
  return CurrLionVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrLionVoltage = function (currLionVoltage){
  return CurrLionVoltage.create(currLionVoltage);
};

module.exports = exportObj;

