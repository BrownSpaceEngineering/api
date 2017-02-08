var router = require('express').Router();
var Temperature = require('../common/temperature');

var model = "battery"
// Returns all battery temperature readings
router.get('/', function(req, res, next) {
  Temperature.findAllErrorCodes(model)
  .then(function(temps) {
    res.send(temps);
  })
})

// Write a new battery temperature to the database
router.post('/:temp', function(req, res, next) {
  Temperature.addTemperature(model, req.params['temp'])
  .then(function(createdTemp) {
    res.send(createdTemp);
  })
})

// Return temperature with id 'id'
router.get('/:id', function(req, res, next) {
  Temperature.getTemperatureByID(model, req.params['id'])
  .then(function(temps) {
    res.send(temps)
  })

  // Delete a temperature with id 'id'
  router.delete('/:id', function(req, res, next) {
    Temperature.deleteTemperature(model, req.params['id'])
    .then(function())
  })

  router.put('/:id/:error', function(req, res, next) {
    //TODO: Fill in
  })
})

module.exports =
