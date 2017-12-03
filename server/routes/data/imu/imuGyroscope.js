var router = require('express').Router();
var ImuGyroscope = require('../../common/imu/imuGyroscope');

//Endpoint: /equisat/data/imu/gyroscope
router.get('/', function (req, res, next){
	ImuGyroscope.findAllImuGyroscope()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/imu/gyroscope/id
router.get('/:id', function (req, res, next){
	ImuGyroscope.getImuGyroscope(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
