var router = require('express').Router();
var CurrLionVoltage = require('../../../common/currentData/lion/currLionVoltage');

//Endpoint: /api/data/currentData/currLionVoltage
router.get('/', function (req, res, next){
	CurrLionVoltage.findAllCurrLionVoltage()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currLionVoltage/id
router.get('/:id', function (req, res, next){
	CurrLionVoltage.getCurrLionVoltageById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;