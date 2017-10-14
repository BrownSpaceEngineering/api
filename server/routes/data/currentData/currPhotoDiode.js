var router = require('express').Router();
var CurrPhotoDiode = require('../../common/currentData/currPhotoDiode');

//Endpoint: /api/data/currentData/currPhotoDiode
router.get('/', function (req, res, next){
	CurrPhotoDiode.findAllCurrPhotoDiode()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currPhotoDiode/id
router.get('/:id', function (req, res, next){
	CurrPhotoDiode.getCurrPhotoDiodeById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;