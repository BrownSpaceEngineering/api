var router = require('express').Router();
var CurrBatteryChargingDigitalSignal = require('../../common/currentData/currBatteryChargingDigitalSignal');

//Endpoint: /api/data/currentData/currBatteryChargingDigitalSignal
router.get('/', function (req, res, next){
	CurrBatteryChargingDigitalSignal.findAllCurrBatteryChargingDigitalSignal()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/currentData/currBatteryChargingDigitalSignal/id
router.get('/:id', function (req, res, next){
	CurrBatteryChargingDigitalSignal.getCurrBatteryChargingDigitalSignalById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
