var router = require('express').Router();
var BatteryChargingAnalogVoltage = require('../../common/batteryCharging/batteryChargingAnalogVoltage');

//Endpoint: /equisat/data/batteryCharging/analogVoltage
router.get('/', function (req, res, next){
	BatteryChargingAnalogVoltage.findAllBatteryChargingAnalogVoltage()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/batteryCharging/analogVoltage/id
router.get('/:id', function (req, res, next){
	BatteryChargingAnalogVoltage.getBatteryChargingAnalogVoltageById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
