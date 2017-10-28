var router = require('express').Router();
var AttitudeIrTemperature = require('../../common/dataAttitude/attitudeIrTemperature');

router.get('/', function (req, res, next){
  AttitudeIrTemperature.findAllAttitudeIrTemperature()
  .then(function (attitudeIrTemperature){
    res.send(attitudeIrTemperature);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  AttitudeIrTemperature.getAttitudeIrTemperatureById(req.params.id)
  .then(function (attitudeIrTemperature){
    res.send(Temperature);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
