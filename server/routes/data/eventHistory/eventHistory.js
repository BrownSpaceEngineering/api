var router = require('express').Router();
var EventHistory = require('../../common/eventHistory/eventHistory');

//Endpoint: /equisat/data/eventHistory/eventHistory
router.get('/', function (req, res, next){
	EventHistory.findAllEventHistory()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/eventHistory/eventHistory/id
router.get('/:id', function (req, res, next){
	EventHistory.getEventHistory(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
