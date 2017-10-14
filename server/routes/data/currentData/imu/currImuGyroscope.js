var router = require('express').Router();
var CurrImuGyroscope = require('../../../common/currentData/imu/currImuGyroscope');

//Endpoint: /api/data/currentData/currImuGyroscope
router.get('/', function (req, res, next){
	CurrImuGyroscope.findAllCurrImuGyroscope()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currImuGyroscope/id
router.get('/:id', function (req, res, next){
	CurrImuGyroscope.getCurrImuGyroscopeById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;