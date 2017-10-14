var AttitudePhotoDiode = require('../../../database/models/dataAttitude/attitudePhotoDiode');

var exportObj = {};

// get all
exportObj.findAllAttitudePhotoDiode = function (){
  return AttitudePhotoDiode.findAll();
};

// get one
exportObj.getAttitudePhotoDiodeById = function (id){
  return AttitudePhotoDiode.findOne({ where: { id:id } });
};

// add one
exportObj.addAttitudePhotoDiode = function (attitudePhotoDiode){
  return AttitudePhotoDiode.create(attitudePhotoDiode);
};

module.exports = exportObj;

