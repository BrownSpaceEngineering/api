var router = require('express').Router();
var RadioTemperature = require('../../common/radio/radioTemperature');

//Endpoint: /equisat/data/radio/temperature
router.get('/', function (req, res, next){
	RadioTemperature.findAllRadioTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/radio/temperature/id
router.get('/:id', function (req, res, next){
	RadioTemperature.getRadioTemperature(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
