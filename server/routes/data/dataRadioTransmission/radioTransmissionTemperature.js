var router = require('express').Router();
var RadioTransmissionTemperature = require('../../common/dataRadioTransmission/radioTransmissionTemperature');

router.get('/', function (req, res, next){
  RadioTransmissionTemperature.findAllRadioTransmissionTemperature()
  .then(function (radioTransmissionTemperatures){
    res.send(radioTransmissionTemperatures);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  RadioTransmissionTemperature.getRadioTransmissionTemperatureById(req.params.id)
  .then(function (radioTransmissionTemperature){
    res.send(radioTransmissionTemperature);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
