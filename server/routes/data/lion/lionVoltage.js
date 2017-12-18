var router = require('express').Router();
var LionVoltage = require('../../common/lion/lionVoltage');

//Endpoint: /equisat/data/lion/voltage
router.get('/', function (req, res, next){
	LionVoltage.findAllLionVoltage()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/lion/voltage/id
router.get('/:id', function (req, res, next){
	LionVoltage.getLionVoltage(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
