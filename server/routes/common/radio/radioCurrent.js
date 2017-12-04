var RadioCurrent = require('../../../database/models/radio/radioCurrent');

var exportObj = {};

// get all
exportObj.findAllRadioCurrent = function (){
  return RadioCurrent.findAll();
};

// get one
exportObj.getRadioCurrent = function (id){
  return RadioCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addRadioCurrent = function (radioCurrent){
  return RadioCurrent.create(radioCurrent);
};

module.exports = exportObj;

