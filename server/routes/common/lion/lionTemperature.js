var LionTemperature = require('../../../database/models/liOn/liOnTemperature');

var exportObj = {};

// get all
exportObj.findAllLionTemperature = function (){
  return LionTemperature.findAll();
};

// get one
exportObj.getLionTemperatureById = function (id){
  return LionTemperature.findOne({ where: { id:id } });
};

// add one
exportObj.addLionTemperature = function (liOnTemperature){
  return LionTemperature.create(liOnTemperature);
};

module.exports = exportObj;

