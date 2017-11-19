var router = require('express').Router();
var IdleRadioTemperature = require('../../common/idleData/idleRadioTemperature');


router.get('/', function (req, res, next){
  IdleRadioTemperature.findAllIdleRadioTemperature()
  .then(function (idleRadioTemperatures){
    res.send(idleRadioTemperatures);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  IdleRadioTemperature.getIdleRadioTemperatureById(req.params.id)
  .then(function (idleRadioTemperature){
    res.send(idleRadioTemperature);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
