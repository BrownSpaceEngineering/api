var LifepoTemperature = require('../../../database/models/liFePo/liFePoTemperature');

var exportObj = {};

// get all
exportObj.findAllLifepoTemperature = function (){
  return LifepoTemperature.findAll();
};

// get one
exportObj.getLifepoTemperatureById = function (id){
  return LifepoTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addLifepoTemperature = function (lifepoTemperature){
  return LifepoTemperature.create(lifepoTemperature);
};

module.exports = exportObj;

