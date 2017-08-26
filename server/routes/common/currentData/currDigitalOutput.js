var CurrDigitalOutput = require('../../database/models/currentData/currDigitalOutput');

var exportObj = {};

// get all
exportObj.findAllCurrDigitalOutput = function (){
  return CurrDigitalOutput.findAll();
};

// get one
exportObj.getCurrDigitalOutputById = function (id){
  return CurrDigitalOutput.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrDigitalOutput = function (currDigitalOutput){
  return CurrDigitalOutput.create(currDigitalOutput);
};

module.exports = exportObj;

