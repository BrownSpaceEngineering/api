var router = require('express').Router();
var CurrLastFlashLedCurrent = require('../../../common/currentData/lastFlash/currLastFlashLedCurrent');

//Endpoint: /api/data/currentData/currLastFlashLedCurrent
router.get('/', function (req, res, next){
	CurrLastFlashLedCurrent.findAllCurrLastFlashLedCurrent()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currLastFlashLedCurrent/id
router.get('/:id', function (req, res, next){
	CurrLastFlashLedCurrent.getCurrLastFlashLedCurrentById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;