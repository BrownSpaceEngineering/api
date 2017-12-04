var router = require('express').Router();
var LifepoCurrent = require('../../common/lifepo/lifepoCurrent');

//Endpoint: /equisat/data/lifepo/current
router.get('/', function (req, res, next){
	LifepoCurrent.findAllLifepoCurrent()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/lifepo/current/id
router.get('/:id', function (req, res, next){
	LifepoCurrent.getLifepoCurrent(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
