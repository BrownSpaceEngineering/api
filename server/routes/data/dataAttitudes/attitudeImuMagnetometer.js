var router = require('express').Router();
var AttidudeImuMagnetometer = require('../common/dataAttitude/AttidudeImuMagnetometer');

router.get('/', function (req, res, next){
  AttidudeImuMagnetometer.findAllAttidudeImuMagnetometer()
  .then(function (attidudeImuMagnetometers){
    res.send(attidudeImuMagnetometers);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  AttidudeImuMagnetometer.getAttidudeImuMagnetometerById(req.params.id)
  .then(function (attidudeImuMagnetometer){
    res.send(attidudeImuMagnetometer);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});
