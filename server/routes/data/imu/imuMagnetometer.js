var router = require('express').Router();
var ImuMagnetometer = require('../../common/imu/imuMagnetometer');

//Endpoint: /equisat/data/imu/magnetometer
router.get('/', function (req, res, next){
	ImuMagnetometer.findAllImuMagnetometer()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/imu/magnetometer/id
router.get('/:id', function (req, res, next){
	ImuMagnetometer.getImuMagnetometer(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
