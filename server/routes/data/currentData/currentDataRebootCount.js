var router = require('express').Router();
var CurrentDataRebootCount = require('../../common/currentData/currentDataRebootCount');

//Endpoint: /equisat/data/currentData/rebootCount
router.get('/', function (req, res, next){
	CurrentDataRebootCount.findAllCurrentDataRebootCount()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/currentData/rebootCount/id
router.get('/:id', function (req, res, next){
	CurrentDataRebootCount.getCurrentDataRebootCount(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
