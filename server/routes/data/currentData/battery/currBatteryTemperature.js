var router = require('express').Router();
var CurrBatteryTemperature = require('../../../common/currentData/battery/currBatteryTemperature');

//Endpoint: /api/data/currentData/currBatteryTemperature
router.get('/', function (req, res, next){
	CurrBatteryTemperature.findAllCurrBatteryTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currBatteryTemperature/id
router.get('/:id', function (req, res, next){
	CurrBatteryTemperature.getCurrBatteryTemperatureById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;