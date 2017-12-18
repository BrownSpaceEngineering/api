var IrAmbientTemperature = require('../../../database/models/ir/irAmbientTemperature');

var exportObj = {};

// get all
exportObj.findAllIrAmbientTemperature = function (){
  return IrAmbientTemperature.findAll();
};

// get one
exportObj.getIrAmbientTemperatureById = function (id){
  return IrAmbientTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addIrAmbientTemperature = function (irAmbientTemperature){
  return IrAmbientTemperature.create(irAmbientTemperature);
};

module.exports = exportObj;

