var router = require('express').Router();
var LedCurrent = require('../../common/led/ledCurrent');

//Endpoint: /equisat/data/led/current
router.get('/', function (req, res, next){
	LedCurrent.findAllLedCurrent()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/led/current/id
router.get('/:id', function (req, res, next){
	LedCurrent.getLedCurrent(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
