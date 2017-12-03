var LionVoltage = require('../../../database/models/liOn/liOnVoltage');

var exportObj = {};

// get all
exportObj.findAllLionVoltage = function (){
  return LionVoltage.findAll();
};

// get one
exportObj.getLionVoltage = function (id){
  return LionVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addLionVoltage = function (liOnVoltage){
  return LionVoltage.create(liOnVoltage);
};

module.exports = exportObj;

