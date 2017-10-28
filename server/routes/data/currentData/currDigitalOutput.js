var router = require('express').Router();
var CurrDigitalOutput = require('../../common/currentData/currDigitalOutput');

//Endpoint: /api/data/currentData/currDigitalOutput
router.get('/', function (req, res, next){
	CurrDigitalOutput.findAllCurrDigitalOutput()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currDigitalOutput/id
router.get('/:id', function (req, res, next){
	CurrDigitalOutput.getCurrDigitalOutputById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
