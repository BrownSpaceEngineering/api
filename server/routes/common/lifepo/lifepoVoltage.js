var LifepoVoltage = require('../../../database/models/liFePo/liFePoVoltage');

var exportObj = {};

// get all
exportObj.findAllLifepoVoltage = function (){
  return LifepoVoltage.findAll();
};

// get one
exportObj.getLifepoVoltageById = function (id){
  return LifepoVoltage.findOne({ where: { id:id } });
};

// add one
exportObj.addLifepoVoltage = function (lifepoVoltage){
  return LifepoVoltage.create(lifepoVoltage);
};

module.exports = exportObj;

