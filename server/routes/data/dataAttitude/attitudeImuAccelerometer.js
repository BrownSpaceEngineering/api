var router = require('express').Router();
var AttitudeImuAccelerometer = require('../../common/dataAttitude/attitudeImuAccelerometer');

router.get('/', function (req, res, next){
  AttitudeImuAccelerometer.findAllAttitudeImuAccelerometer()
  .then(function (attitudeImuAccelerometers){
    res.send(attitudeImuAccelerometers);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  AttitudeImuAccelerometer.getAttitudeImuAccelerometerById(req.params.id)
  .then(function (attitudeImuAccelerometer){
    res.send(attitudeImuAccelerometer);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
