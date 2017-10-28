var router = require('express').Router();
var FlashCompLifepoVoltage = require('../../common/dataFlashComparison/flashCompLifepoVoltage');

router.get('/', function (req, res, next){
  FlashCompLifepoVoltage.findAllFlashCompLifepoVoltage()
  .then(function (flashCompLifepoVoltages){
    res.send(flashCompLifepoVoltages);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  FlashCompLifepoVoltage.getFlashCompLifepoVoltageById(req.params.id)
  .then(function (flashCompLifepoVoltage){
    res.send(flashCompLifepoVoltage);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
