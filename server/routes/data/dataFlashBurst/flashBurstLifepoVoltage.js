var router = require('express').Router();
var FlashBurstLifepoVoltage = require('../../common/dataFlashBurst/flashBurstLifepoVoltage');

//Endpoint: /api/data/dataFlashBurst/flashBurstLifepoVoltage
router.get('/', function (req, res, next){
	FlashBurstLifepoVoltage.findAllFlashBurstLifepoVoltage()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/dataFlashBurst/flashBurstLifepoVoltage/id
router.get('/:id', function (req, res, next){
	FlashBurstLifepoVoltage.getFlashBurstLifepoVoltageById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;