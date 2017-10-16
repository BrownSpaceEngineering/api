var Raw = require('../../database/models/raw.js');

var exportObj = {};

// get all
exportObj.findAllRaw = function (){
  return Raw.findAll();
};

// get one
exportObj.getRawById = function (id){
  return Raw.findOne({ where: { id:id } });
};

// add one
exportObj.addRaw = function (raw){
  return Raw.create(raw);
};

module.exports = exportObj;

