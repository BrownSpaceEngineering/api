var router = require('express').Router();
var ProcessorTemperature = require('../../common/processor/processorTemperature');

//Endpoint: /equisat/data/processor/temperature
router.get('/', function (req, res, next){
	ProcessorTemperature.findAllProcessorTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/processor/temperature/id
router.get('/:id', function (req, res, next){
	Photodiode.getProcessorTemperature(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
