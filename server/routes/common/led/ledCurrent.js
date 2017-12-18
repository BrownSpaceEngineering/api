var LedCurrent = require('../../../database/models/led/ledCurrent');

var exportObj = {};

// get all
exportObj.findAllLedCurrent = function (){
  return LedCurrent.findAll();
};

// get one
exportObj.getLedCurrentById = function (id){
  return LedCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addLedCurrent = function (ledCurrent){
  return LedCurrent.create(ledCurrent);
};

module.exports = exportObj;

