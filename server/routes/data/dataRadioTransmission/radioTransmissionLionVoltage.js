var router = require('express').Router();
var RadioTransmissionLionVoltage = require('../../common/dataRadioTransmission/radioTransmissionLionVoltage');

router.get('/', function (req, res, next){
  RadioTransmissionLionVoltage.findAllRadioTransmissionLionVoltage()
  .then(function (radioTransmissionLionVoltages){
    res.send(radioTransmissionLionVoltages);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  RadioTransmissionLionVoltage.getRadioTransmissionLionVoltageById(req.params.id)
  .then(function (radioTransmissionLionVoltage){
    res.send(radioTransmissionLionVoltage);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
