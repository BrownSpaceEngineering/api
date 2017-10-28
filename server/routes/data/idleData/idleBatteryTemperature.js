var router = require('express').Router();
var IdleBatteryTemperature = require('../../common/idleData/idleBatteryTemperature');


router.get('/', function (req, res, next){
  IdleBatteryTemperature.findAllIdleBatteryTemperature()
  .then(function (idleBatteryTemperatures){
    res.send(idleBatteryTemperatures);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  IdleBatteryTemperature.getIdleBatteryTemperatureById(req.params.id)
  .then(function (idleBatteryTemperature){
    res.send(idleBatteryTemperature);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
