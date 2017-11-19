var AttitudeIrTemperature = require('../../../database/models/dataAttitude/attitudeIrTemperature');

var exportObj = {};

// get all
exportObj.findAllAttitudeIrTemperature = function (){
  return AttitudeIrTemperature.findAll();
};

// get one
exportObj.getAttitudeIrTemperatureById = function (id){
  return AttitudeIrTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addAttitudeIrTemperature = function (attitudeIrSensor){
  return AttitudeIrTemperature.create(attitudeIrSensor);
};

module.exports = exportObj;

