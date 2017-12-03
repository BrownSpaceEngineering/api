var router = require('express').Router();
var LifepoTemperature = require('../../common/lifepo/lifepoTemperature');

//Endpoint: /equisat/data/lifepo/temperature
router.get('/', function (req, res, next){
	LifepoTemperature.findAllLifepoTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/lifepo/temperature/id
router.get('/:id', function (req, res, next){
	LifepoTemperature.getLifepoTemperature(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
