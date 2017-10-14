var router = require('express').Router();
var CurrLionDischarge = require('../../../common/currentData/lion/currLionDischarge');

//Endpoint: /api/data/currentData/currLionDischarge
router.get('/', function (req, res, next){
	CurrLionDischarge.findAllCurrLionDischarge()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currLionDischarge/id
router.get('/:id', function (req, res, next){
	CurrLionDischarge.getCurrLionDischargeById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;