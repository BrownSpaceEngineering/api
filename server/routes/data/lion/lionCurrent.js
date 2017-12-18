var router = require('express').Router();
var LionCurrent = require('../../common/lion/lionCurrent');

//Endpoint: /equisat/data/lion/current
router.get('/', function (req, res, next){
	LionCurrent.findAllLionCurrent()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/lion/current/id
router.get('/:id', function (req, res, next){
	LionCurrent.getLionCurrent(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
