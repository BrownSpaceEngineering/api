var db = require('../../database/_db');

//var Temperature = db.model('temperature');

var exportObj = {};

exportObj = {};

// get all
exportObj.findAllTemperatures = function(model){

  return db.model(model).findAll();
};

// get one
exportObj.getTemperatureByID = function(model, id){
  return db.model(model).findOne({ where: { id:id } });
};

// add one
exportObj.addTemperature = function(model, temp){
  return db.model(model).create(temp)
  .then(function(createdTemp){
    db.model(model).findOrCreate(createdTemp);
  });
};

// update one (Someone please fix this cause I have no idea what I'm doing)
exportObj.updateTemperature = function(model, id, newTemp){
  return db.model(model).update(newTemp, { where: { id: id } });
};

// delete a temperature reading based on id
exportObj.deleteTemperature = function(model, id){
  return db.model(model).destroy({ where: { id: id } });
};
