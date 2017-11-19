var Idle33VRailVoltage = require('../../../database/models/idleData/idle33VRailVoltage');

var exportObj = {};

// get all
exportObj.findAllIdle33VRailVoltage = function (){
  return Idle33VRailVoltage.findAll();
};

// get one
exportObj.getIdle33VRailVoltageById = function (id){
  return Idle33VRailVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addIdle33VRailVoltage = function (idle33VRailVoltage){
  return Idle33VRailVoltage.create(idle33VRailVoltage);
};

module.exports = exportObj;
