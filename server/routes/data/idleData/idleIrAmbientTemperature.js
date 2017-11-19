var router = require('express').Router();
var IdleIrAmbientTemperature = require('../../common/idleData/idleIrAmbientTemperature');


router.get('/', function (req, res, next){
  IdleIrAmbientTemperature.findAllIdleIrAmbientTemperature()
  .then(function (idleIrAmbientTemperatures){
    res.send(idleIrAmbientTemperatures);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  IdleIrAmbientTemperature.getIdleIrAmbientTemperatureById(req.params.id)
  .then(function (idleIrAmbientTemperature){
    res.send(idleIrAmbientTemperature);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
