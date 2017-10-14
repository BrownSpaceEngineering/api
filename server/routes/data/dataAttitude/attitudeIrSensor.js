var router = require('express').Router();
var AttitudeIrSensor = require('../../common/dataAttitude/attitudeIrSensor');

router.get('/', function (req, res, next){
  AttitudeIrSensor.findAllAttitudeIrSensor()
  .then(function (attitudeIrSensors){
    res.send(attitudeIrSensors);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  AttitudeIrSensor.getAttitudeIrSensorById(req.params.id)
  .then(function (attitudeIrSensor){
    res.send(attitudeIrSensor);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
