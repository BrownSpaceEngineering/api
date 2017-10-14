var router = require('express').Router();
var AttitudeMagnetometer = require('../../common/dataAttitude/attitudeMagnetometer');

router.get('/', function (req, res, next){
  AttitudeMagnetometer.findAllAttitudeMagnetometer()
  .then(function (attitudeMagnetometers){
    res.send(attitudeMagnetometers);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  AttitudeMagnetometer.getAttitudeMagnetometerById(req.params.id)
  .then(function (attitudeMagnetometer){
    res.send(attitudeMagnetometer);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
