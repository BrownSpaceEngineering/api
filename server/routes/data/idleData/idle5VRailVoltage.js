var router = require('express').Router();
var Idle5VRailVoltage = require('../../common/idleData/idle5VRailVoltage');


router.get('/', function (req, res, next){
  Idle5VRailVoltage.findAllIdle5VRailVoltage()
  .then(function (idle5VRailVoltages){
    res.send(idle5VRailVoltages);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  Idle5VRailVoltage.getIdle5VRailVoltageById(req.params.id)
  .then(function (idle5VRailVoltage){
    res.send(idle5VRailVoltage);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
