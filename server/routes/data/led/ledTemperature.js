var router = require('express').Router();
var LedTemperature = require('../../common/led/ledTemperature');

//Endpoint: /equisat/data/led/temperature
router.get('/', function (req, res, next){
	LedTemperature.findAllLedTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/led/temperature/id
router.get('/:id', function (req, res, next){
	LedTemperature.getLedTemperature(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
