var router = require('express').Router();
var RadioTransmissionCurrent = require('../common/dataRadioTransmission/radioTransmissionCurrent');


router.get('/', function (req, res, next){
  RadioTransmissionCurrent.findAllRadioTransmissionCurrent()
  .then(function (radioTransmissionCurrents){
    res.send(radioTransmissionCurrents);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  RadioTransmissionCurrent.getRadioTransmissionCurrentById(req.params.id)
  .then(function (radioTransmissionCurrent){
    res.send(radioTransmissionCurrent);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});
