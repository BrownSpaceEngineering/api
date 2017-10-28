var CurrLionCurrent = require('../../../database/models/currentData/currLionCurrent');

var exportObj = {};

// get all
exportObj.findAllCurrLionCurrent = function (){
  return CurrLionCurrent.findAll();
};

// get one
exportObj.getCurrLionCurrentById = function (id){
  return CurrLionCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrLionCurrent = function (currLionCurrent){
  return CurrLionCurrent.create(currLionCurrent);
};

module.exports = exportObj;

