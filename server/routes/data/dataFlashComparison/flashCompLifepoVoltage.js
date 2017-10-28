var router = require('express').Router();
var FlashCompLifepoVoltage = require('../../common/dataFlashComparison/flashCompLifepoVoltage');

router.get('/', function (req, res, next){
  FlashCompLifepoVoltage.findAllFlashCompLifepoVoltage()
  .then(function (flashCompLifepoVoltages){
    res.send(flashCompLifepoCurrents);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  FlashCompLifepoVoltage.getFFlashCompLifepoVoltageById(req.params.id)
  .then(function (flashCompLifepoVoltages){
    res.send(flashCompLifepoCurrent);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
