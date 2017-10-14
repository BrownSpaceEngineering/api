var router = require('express').Router();
var CurrLastFlashLifepoCurrent = require('../../../common/currentData/lastFlash/currLastFlashLifepoCurrent');

//Endpoint: /api/data/currentData/currLastFlashLifepoCurrent
router.get('/', function (req, res, next){
	CurrLastFlashLifepoCurrent.findAllCurrLastFlashLifepoCurrent()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currLastFlashLifepoCurrent/id
router.get('/:id', function (req, res, next){
	CurrLastFlashLifepoCurrent.getCurrLastFlashLifepoCurrentById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;