var EventHistory = require('../../../database/models/eventHistory/eventHistory');

var exportObj = {};

// get all
exportObj.findAllEventHistory = function (){
  return EventHistory.findAll();
};

// get one
exportObj.getEventHistoryById = function (id){
  return EventHistory.findOne({ where: { id:id } });
};

// add one
exportObj.addEventHistory = function (eventHistory){
  return EventHistory.create(eventHistory);
};

module.exports = exportObj;

