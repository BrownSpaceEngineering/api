var router = require('express').Router();
var BatteryChargingDigitalSignal = require('../../common/batteryCharging/batteryChargingDigitalSignal');

//Endpoint: /equisat/data/batteryCharging/digitalSignal
router.get('/', function (req, res, next){
	BatteryChargingDigitalSignal.findAllBatteryChargingDigitalSignal()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/batteryCharging/digitalSignal/id
router.get('/:id', function (req, res, next){
	BatteryChargingDigitalSignal.getBatteryChargingDigitalSignalById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
