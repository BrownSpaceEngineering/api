var router = require('express').Router();
var CurrImuAccelerometer = require('../../../common/currentData/imu/currImuAccelerometer');

//Endpoint: /api/data/currentData/currImuAccelerometer
router.get('/', function (req, res, next){
	CurrImuAccelerometer.findAllCurrImuAccelerometer()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currImuAccelerometer/id
router.get('/:id', function (req, res, next){
	CurrImuAccelerometer.getCurrImuAccelerometerById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;