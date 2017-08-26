var CurrPhotoDiode = require('../../database/models/currentData/currPhotoDiode');

var exportObj = {};

// get all
exportObj.findAllCurrPhotoDiode = function (){
  return CurrPhotoDiode.findAll();
};

// get one
exportObj.getCurrPhotoDiodeById = function (id){
  return CurrPhotoDiode.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrPhotoDiode = function (currPhotoDiode){
  return CurrPhotoDiode.create(currPhotoDiode);
};

module.exports = exportObj;

