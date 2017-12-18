var ProcessorTemperature = require('../../../database/models/processor/processorTemperature');

var exportObj = {};

// get all
exportObj.findAllProcessorTemperature = function (){
  return ProcessorTemperature.findAll();
};

// get one
exportObj.getProcessorTemperature = function (id){
  return ProcessorTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addProcessorTemperature = function (processorTemperature){
  return ProcessorTemperature.create(processorTemperature);
};

module.exports = exportObj;

