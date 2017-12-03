var router = require('express').Router();
var IrObjectTemperature = require('../../common/irSensor/irObjectTemperature');

//Endpoint: /equisat/data/irSensor/objectTemperature
router.get('/', function (req, res, next){
	IrObjectTemperature.findAllIrObjectTemperature()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/irSensor/objectTemperature/id
router.get('/:id', function (req, res, next){
	IrObjectTemperature.getIrObjectTemperature(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
