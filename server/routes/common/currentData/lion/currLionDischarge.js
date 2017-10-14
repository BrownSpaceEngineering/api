var CurrLionDischarge = require('../../../../database/models/currentData/lion/currLionDischarge');

var exportObj = {};

// get all
exportObj.findAllCurrLionDischarge = function (){
  return CurrLionDischarge.findAll();
};

// get one
exportObj.getCurrLionDischargeById = function (id){
  return CurrLionDischarge.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrLionDischarge = function (currLionDischarge){
  return CurrLionDischarge.create(currLionDischarge);
};

module.exports = exportObj;

