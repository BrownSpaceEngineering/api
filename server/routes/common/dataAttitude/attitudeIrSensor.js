var AttitudeIrSensor = require('../../database/models/dataAttitude/attitudeIrSensor');

var exportObj = {};

// get all
exportObj.findAllAttitudeIrSensor = function (){
  return AttitudeIrSensor.findAll();
};

// get one
exportObj.getAttitudeIrSensorById = function (id){
  return AttitudeIrSensor.findOne({ where: { id:id } });
};

// add one
exportObj.addAttitudeIrSensor = function (attitudeIrSensor){
  return AttitudeIrSensor.create(attitudeIrSensor);
};

module.exports = exportObj;

