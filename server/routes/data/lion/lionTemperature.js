var router = require('express').Router();
var LionTemperature = require('../../common/lion/lionTemperature');

//Endpoint: /equisat/data/lion/temperature
router.get('/', function (req, res, next){
	LionTemperature.findAllLionTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/lion/temperature/id
router.get('/:id', function (req, res, next){
	LionTemperature.getLionTemperature(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
