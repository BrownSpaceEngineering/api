var router = require('express').Router();
var IrAmbientTemperature = require('../../common/irSensor/irAmbientTemperature');

//Endpoint: /equisat/data/irSensor/ambientTemperature
router.get('/', function (req, res, next){
	IrAmbientTemperature.findAllIrAmbientTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/irSensor/ambientTemperature/id
router.get('/:id', function (req, res, next){
	IrAmbientTemperature.getIrAmbientTemperature(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
