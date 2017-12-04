var LedTemperature = require('../../../database/models/led/ledTemperature');

var exportObj = {};

// get all
exportObj.findAllLedTemperature = function (){
  return LedTemperature.findAll();
};

// get one
exportObj.getLedTemperatureById = function (id){
  return LedTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addLedTemperature = function (ledTemperature){
  return LedTemperature.create(ledTemperature);
};

module.exports = exportObj;

