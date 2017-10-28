var router = require('express').Router();
var FlashCompLifepoCurrent = require('../../common/dataFlashComparison/flashCompLifepoCurrent');

router.get('/', function (req, res, next){
  FlashCompLifepoCurrent.findAllFlashCompLifepoCurrent()
  .then(function (flashCompLifepoCurrents){
    res.send(flashCompLifepoCurrents);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  FlashCompLifepoCurrent.getFlashCompLifepoCurrentById(req.params.id)
  .then(function (flashCompLifepoCurrent){
    res.send(flashCompLifepoCurrent);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
