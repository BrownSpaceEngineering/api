var router = require('express').Router();
var CurrentDataTimeToFlash = require('../../common/currentData/currentDataTimeToFlash');

//Endpoint: /equisat/data/currentData/timeToFlash
router.get('/', function (req, res, next){
	CurrentDataTimeToFlash.findAllCurrentDataTimeToFlash()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/currentData/timeToFlash/id
router.get('/:id', function (req, res, next){
	CurrentDataTimeToFlash.getCurrentDataTimeToFlash(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
