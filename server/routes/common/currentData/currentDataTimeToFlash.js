var CurrentDataTimeToFlash = require('../../../database/models/currentData/timeToFlash');

var exportObj = {};

// get all
exportObj.findAllCurrentDataTimeToFlash = function (){
  return TimeToFlash.findAll();
};

// get one
exportObj.getCurrentDataTimeToFlashById = function (id){
  return TimeToFlash.findOne({ where: { id:id } });
};

// add one
exportObj.addCurrentDataTimeToFlash = function (timeToFlash){
  return TimeToFlash.create(timeToFlash);
};

module.exports = exportObj;

