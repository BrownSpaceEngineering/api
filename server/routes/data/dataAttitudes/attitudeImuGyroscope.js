var router = require('express').Router();
var AttitudeImuGyroscope = require('../common/dataAttitude/attitudeImuGyroscope');

router.get('/', function (req, res, next){
  AttitudeImuGyroscope.findAllAttitudeImuGyroscope()
  .then(function (attitudeImuGyroscopes){
    res.send(attitudeImuGyroscopes);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  AttitudeImuGyroscope.getAttitudeImuGyroscopeById(req.params.id)
  .then(function (attitudeImuGyroscopes){
    res.send(attitudeImuGyroscopes);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});
