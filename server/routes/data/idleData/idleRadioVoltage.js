var router = require('express').Router();
var IdleRadioVoltage = require('../../common/idleData/idleRadioVoltage');


router.get('/', function (req, res, next){
  IdleRadioVoltage.findAllIdleRadioVoltage()
  .then(function (idleRadioVoltages){
    res.send(idleRadioVoltages);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  IdleRadioVoltage.getIdleRadioVoltageById(req.params.id)
  .then(function (idleRadioVoltage){
    res.send(idleRadioVoltage);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
