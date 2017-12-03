var IrObjectTemperature = require('../../../database/models/ir/irObjectTemperature');

var exportObj = {};

// get all
exportObj.findAllIrObjectTemperature = function (){
  return IrObjectTemperature.findAll();
};

// get one
exportObj.getIrObjectTemperatureById = function (id){
  return IrObjectTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addIrObjectTemperature = function (irObjectTemperature){
  return IrObjectTemperature.create(irObjectTemperature);
};

module.exports = exportObj;

