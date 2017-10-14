var router = require('express').Router();
var AttitudePhotoDiode = require('../../common/dataAttitude/attitudePhotoDiode');

router.get('/', function (req, res, next){
  AttitudePhotoDiode.findAllAttitudePhotoDiode()
  .then(function (attitudePhotoDiodes){
    res.send(attitudePhotoDiodes);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  AttitudePhotoDiode.getAttitudePhotoDiodeById(req.params.id)
  .then(function (attitudePhotoDiode){
    res.send(attitudePhotoDiode);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
