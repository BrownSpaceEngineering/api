var router = require('express').Router();
var FlashCompLedTemperature = require('../../common/dataFlashComparison/flashCompLedTemperature');


router.get('/', function (req, res, next){
  FlashCompLedTemperature.findAllFlashCompLedTemperature()
  .then(function (flashCompLedTemperatures){
    res.send(flashCompLedTemperatures);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  FlashCompLedTemperature.getFlashCompLedTemperatureById(req.params.id)
  .then(function (flashCompLedTemperature){
    res.send(flashCompLedTemperature);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
