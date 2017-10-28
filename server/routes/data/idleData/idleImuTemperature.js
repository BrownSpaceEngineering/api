var router = require('express').Router();
var IdleImuTemperature = require('../../common/idleData/idleImuTemperature');


router.get('/', function (req, res, next){
  IdleImuTemperature.findAllIdleImuTemperature()
  .then(function (idleImuTemperatures){
    res.send(idleImuTemperatures);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  IdleImuTemperature.getIdleImuTemperatureById(req.params.id)
  .then(function (idleImuTemperature){
    res.send(idleImuTemperature);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
