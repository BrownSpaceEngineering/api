var router = require('express').Router();
var FlashCompLedCurrent = require('../../common/dataFlashComparison/flashCompLedCurrent');


router.get('/', function (req, res, next){
  FlashCompLedCurrent.findAllFlashCompLedCurrent()
  .then(function (flashCompLedCurrents){
    res.send(flashCompLedCurrents);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  FlashCompLedCurrent.getFlashCompLedCurrentById(req.params.id)
  .then(function (flashCompLedCurrent){
    res.send(flashCompLedCurrent);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
