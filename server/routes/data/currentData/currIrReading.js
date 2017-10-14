var router = require('express').Router();
var CurrIrReading = require('../../common/currentData/currIrReading');

//Endpoint: /api/data/currentData/currIrReading
router.get('/', function (req, res, next){
	CurrIrReading.findAllCurrIrReading()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currIrReading/id
router.get('/:id', function (req, res, next){
	CurrIrReading.getCurrIrReadingById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;