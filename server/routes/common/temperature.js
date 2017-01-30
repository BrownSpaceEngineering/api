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

// update one


// delete one

