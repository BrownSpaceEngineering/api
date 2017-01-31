var db = require('../../database/_db');

var Temperature = db.model('temperature');

var exportObj = {};

exportObj = {};

// get all
exportObj.findAllTemperatures = function(){
  return Temperature.findAll();
};

// get one
exportObj.getTemperatureByID = function(id){
  return Temperature.findOne({ where: { id:id } });
};

// add one
exportObj.addTemperature = function(temp){
  return Temperature.create(temp)
  .then(function(createdTemp){
    Temperature.findOrCreate(createdTemp); 
  });
};

// update one (Someone please fix this cause I have no idea what I'm doing)
exportObj.updateTemperature = function(id, newTemp){
  return Temperature.update(newTemp, { where: { id: id } });
};

// delete a temperature reading based on id
exportObj.deleteTemperature = function(id){
  return Temperature.destroy({ where: { id: id } });
};


 