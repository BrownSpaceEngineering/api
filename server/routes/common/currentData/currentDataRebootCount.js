var CurrentDataRebootCount = require('../../../database/models/currentData/rebootCount');

var exportObj = {};

// get all
exportObj.findAllCurrentDataRebootCount = function (){
  return CurrentDataRebootCount.findAll();
};

// get one
exportObj.getCurrentDataRebootCountById = function (id){
  return CurrentDataRebootCount.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrentDataRebootCount = function (currentDataRebootCount){
  return CurrentDataRebootCount.create(currentDataRebootCount);
};

module.exports = exportObj;

