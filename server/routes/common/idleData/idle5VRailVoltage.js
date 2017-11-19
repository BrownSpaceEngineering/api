var Idle5VRailVoltage = require('../../../database/models/idleData/idle5VRailVoltage');

var exportObj = {};

// get all
exportObj.findAllIdle5VRailVoltage = function (){
  return Idle5VRailVoltage.findAll();
};

// get one
exportObj.getIdle5VRailVoltageById = function (id){
  return Idle5VRailVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addIdle5VRailVoltage = function (idle5VRailVoltage){
  return Idle5VRailVoltage.create(idle5VRailVoltage);
};

module.exports = exportObj;
