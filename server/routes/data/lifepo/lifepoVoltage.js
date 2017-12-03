var router = require('express').Router();
var LifepoVoltage = require('../../common/lifepo/lifepoVoltage');

//Endpoint: /equisat/data/lifepo/voltage
router.get('/', function (req, res, next){
	LifepoVoltage.findAllLifepoVoltage()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/lifepo/voltage/id
router.get('/:id', function (req, res, next){
	LifepoVoltage.getLifepoVoltage(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
