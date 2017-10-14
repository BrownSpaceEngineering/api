var router = require('express').Router();
var CurrLastFlashLedTemperature = require('../../../common/currentData/lastFlash/currLastFlashLedTemperature');

//Endpoint: /api/data/currentData/currLastFlashLedTemperature
router.get('/', function (req, res, next){
	CurrLastFlashLedTemperature.findAllCurrLastFlashLedTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currLastFlashLedTemperature/id
router.get('/:id', function (req, res, next){
	CurrLastFlashLedTemperature.getCurrLastFlashLedTemperatureById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;