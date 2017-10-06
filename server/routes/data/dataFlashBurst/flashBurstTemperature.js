var router = require('express').Router();
var FlashBurstTemperature = require('../../common/dataFlashBurst/flashBurstTemperature');

//Endpoint: /api/data/dataFlashBurst/flashBurstTemperature
router.get('/', function (req, res, next){
	FlashBurstTemperature.findAllFlashBurstTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/dataFlashBurst/flashBurstTemperature/id
router.get('/:id', function (req, res, next){
	FlashBurstTemperature.getFlashBurstTemperatureById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});
module.exports = router;