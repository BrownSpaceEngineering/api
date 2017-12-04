var LionCurrent = require('../../../database/models/liOn/liOnCurrent');

var exportObj = {};

// get all
exportObj.findAllLionCurrent = function (){
  return LionCurrent.findAll();
};

// get one
exportObj.getLionCurrentById = function (id){
  return LionCurrent.findOne({ where: { id:id } });
};

// add one
exportObj.addLionCurrent = function (liOnCurrent){
  return LionCurrent.create(liOnCurrent);
};

module.exports = exportObj;

