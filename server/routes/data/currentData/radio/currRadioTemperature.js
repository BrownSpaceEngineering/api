var router = require('express').Router();
var CurrRadioTemperature = require('../../../common/currentData/radio/currRadioTemperature');

//Endpoint: /api/data/currentData/currRadioTemperature
router.get('/', function (req, res, next){
	CurrRadioTemperature.findAllCurrRadioTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currRadioTemperature/id
router.get('/:id', function (req, res, next){
	CurrRadioTemperature.getCurrRadioTemperatureById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;