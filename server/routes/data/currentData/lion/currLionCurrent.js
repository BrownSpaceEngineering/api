var router = require('express').Router();
var CurrLionCurrent = require('../../../common/currentData/lion/currLionCurrent');

//Endpoint: /api/data/currentData/currLionCurrent
router.get('/', function (req, res, next){
	CurrLionCurrent.findAllCurrLionCurrent()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currLionCurrent/id
router.get('/:id', function (req, res, next){
	CurrLionCurrent.getCurrLionCurrentById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;