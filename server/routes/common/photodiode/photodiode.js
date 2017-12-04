var Photodiode = require('../../../database/models/photodiode/photodiode');

var exportObj = {};

// get all
exportObj.findAllPhotodiode = function (){
  return Photodiode.findAll();
};

// get one
exportObj.getPhotodiode = function (id){
  return Photodiode.findOne({ where: { id:id } });
};

// add one
exportObj.addPhotodiode = function (photodiode){
  return Photodiode.create(photodiode);
};

module.exports = exportObj;

