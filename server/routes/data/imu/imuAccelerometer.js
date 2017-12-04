var router = require('express').Router();
var ImuAccelerometer = require('../../common/imu/imuAccelerometer');

//Endpoint: /equisat/data/imu/accelerometer
router.get('/', function (req, res, next){
	ImuAccelerometer.findAllImuAccelerometer()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/imu/accelerometer/id
router.get('/:id', function (req, res, next){
	ImuAccelerometer.getImuAccelerometer(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
