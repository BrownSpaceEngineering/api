var router = require('express').Router();
var CurrRadioVoltage = require('../../../common/currentData/radio/currRadioVoltage');

//Endpoint: /api/data/currentData/currRadioVoltage
router.get('/', function (req, res, next){
	CurrRadioVoltage.findAllCurrRadioVoltage()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currRadioVoltage/id
router.get('/:id', function (req, res, next){
	CurrRadioVoltage.getCurrRadioVoltageById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;