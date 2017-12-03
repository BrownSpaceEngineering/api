var LifepoCurrent = require('../../../database/models/liFePo/liFePoCurrent');

var exportObj = {};

// get all
exportObj.findAllLifepoCurrent = function (){
  return LifepoCurrent.findAll();
};

// get one
exportObj.getLifepoCurrentById = function (id){
  return LifepoCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addLifepoCurrent = function (lifepoCurrent){
  return LifepoCurrent.create(lifepoCurrent);
};

module.exports = exportObj;

