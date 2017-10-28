var IdleRadioCurrent = require('../../../database/models/idleData/idleRadioCurrent');

var exportObj = {};

// get all
exportObj.findAllIdleRadioCurrent = function (){
  return IdleRadioCurrent.findAll();
};

// get one
exportObj.getIdleRadioCurrentById = function (id){
  return IdleRadioCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addIdleRadioCurrent = function (idleRadioCurrent){
  return IdleRadioCurrent.create(idleRadioCurrent);
};

module.exports = exportObj;
