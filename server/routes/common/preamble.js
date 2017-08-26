var Preamble = require('../../database/models/preamble');

var exportObj = {};

// get all
exportObj.findAllPreamble = function (){
  return Preamble.findAll();
};

// get one
exportObj.getPreambleById = function (id){
  return Preamble.findOne({ where: { id:id } });
};

// add one
exportObj.addPreamble = function (preamble){
  return Preamble.create(preamble);
};

module.exports = exportObj;

