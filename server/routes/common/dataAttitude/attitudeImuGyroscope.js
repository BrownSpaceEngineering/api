var AttitudeImuGyroscope = require('../../../database/models/dataAttitude/attitudeImuGyroscope');

var exportObj = {};

// get all
exportObj.findAllAttitudeImuGyroscope = function (){
  return AttitudeImuGyroscope.findAll();
};

// get one
exportObj.getAttitudeImuGyroscopeById = function (id){
  return AttitudeImuGyroscope.findOne({ where: { id:id } });
};

// add one
exportObj.addAttitudeImuGyroscope = function (attitudeImuGyroscope){
  return AttitudeImuGyroscope.create(attitudeImuGyroscope);
};

module.exports = exportObj;

