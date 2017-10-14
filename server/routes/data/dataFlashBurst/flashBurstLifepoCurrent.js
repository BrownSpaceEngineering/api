var router = require('express').Router();
var FlashBurstLifepoCurrent = require('../../common/dataFlashBurst/flashBurstLifepoCurrent');

//Endpoint: /api/data/dataFlashBurst/flashBurstLifepoCurrent
router.get('/', function (req, res, next){
	FlashBurstLifepoCurrent.findAllFlashBurstLifepoCurrent()
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
	FlashBurstLifepoCurrent.getFlashBurstLifepoCurrentById(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;