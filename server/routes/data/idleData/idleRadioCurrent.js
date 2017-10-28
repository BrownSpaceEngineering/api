var router = require('express').Router();
var IdleRadioCurrent = require('../../common/idleData/idleRadioCurrent');


router.get('/', function (req, res, next){
  IdleRadioCurrent.findAllIdleRadioCurrent()
  .then(function (idleRadioCurrents){
    res.send(idleRadioCurrents);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  IdleRadioCurrent.getIdleRadioCurrentById(req.params.id)
  .then(function (idleRadioCurrent){
    res.send(idleRadioCurrent);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
