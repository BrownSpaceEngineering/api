var router = require('express').Router();
var CurrBatteryChargingAnalogVoltage = require('../../../common/currentData/battery/currBatteryChargingAnalogVoltage');

//Endpoint: /api/data/currentData/currBatteryChargingAnalogVoltage
router.get('/', function (req, res, next){
	CurrBatteryChargingAnalogVoltage.findAllCurrBatteryChargingAnalogVoltage()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currBatteryChargingAnalogVoltage/id
router.get('/:id', function (req, res, next){
	CurrBatteryChargingAnalogVoltage.getCurrBatteryChargingAnalogVoltageById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;