var router = require('express').Router();
var Idle33VRailVoltage = require('../../common/idleData/idle33VRailVoltage');


router.get('/', function (req, res, next){
  Idle33VRailVoltage.findAllIdle33VRailVoltage()
  .then(function (idle33VRailVoltages){
    res.send(idle33VRailVoltages);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  Idle33VRailVoltage.getIdle33VRailVoltageById(req.params.id)
  .then(function (idle33VRailVoltage){
    res.send(idle33VRailVoltage);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
