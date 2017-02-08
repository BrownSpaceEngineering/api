var router = require('express').Router();
var Temperature = require('../common/temperature.js');
var flashModel = 'flashModel';

// Returns all temperature readings ever in database
router.get('/', function (req, res, next) {
  Temperature.findAllTemperatures(flashModel)
  .then(function(temperatures){
    res.send(temperatures);
  })

})

// Write a new temperature reading to the database
router.post('/:error', function (req, res , next ) {
  //This line probably needs to be modified
  Temperature.addTemperature(flashModel, req.params['temp'])
  .then(function(newTemperature) {
    res.send(newTemperature);
  })
})

// Return temperature reading with id 'id'
router.get('/:id', function (req, res, next) {
  Temperature.getTemperatureByID(flashModel, req.params['id'])
  .then(function(temperature){
    res.send(temperature);
  })

})

// Return all errors of type 'type' This is probably not necessary
/*router.get('/getByType/:type', function(req, res, next) {
  Temperature.getErrorCodesByType(req.params['type'])
  .then(function(errorCodes) {
    res.send(errorCodes);
  })
})
*/

// Delete temperature reading with id 'id'
router.delete('/:id', function(req, res, next) {
  Temperature.deleteTemperature(flashModel, req.params['id'])
  .then(function() {
    res.status(200).end()
  })
})

// Update the error with id 'id' with new error 'error'
router.put('/:id/:error', function (req, res, next) {
  Temperature.updateTemperature(flashModel, req.params['id'], req.params['temp'])
  .then(function(updatedTemperature) {
    res.status(201).send(updatedTemperature)
  })
})



module.exports = router;
