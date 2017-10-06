var router = require('express').Router();
var CurrImuMagnetometer = require('../../../common/currentData/imu/currImuMagnetometer');

//Endpoint: /api/data/currentData/currImuMagnetometer
router.get('/', function (req, res, next){
	CurrImuMagnetometer.findAllCurrImuMagnetometer()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currImuMagnetometer/id
router.get('/:id', function (req, res, next){
	CurrImuMagnetometer.getCurrImuMagnetometerById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;