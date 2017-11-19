var router = require('express').Router();
var FlashBurstLedCurrent = require('../../common/dataFlashBurst/flashBurstLedCurrent');

//Endpoint: /api/data/dataFlashBurst/flashBurstLifepoCurrent
router.get('/', function (req, res, next){
	FlashBurstLedCurrent.findAllFlashBurstLedCurrent()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /api/data/dataFlashBurst/flashBurstLifepoCurrent/id
router.get('/:id', function (req, res, next){
	FlashBurstLedCurrent.getFlashBurstLedCurrentById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;