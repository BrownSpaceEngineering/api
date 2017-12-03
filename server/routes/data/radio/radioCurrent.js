var router = require('express').Router();
var RadioCurrent = require('../../common/radio/radioCurrent');

//Endpoint: /equisat/data/radio/current
router.get('/', function (req, res, next){
	RadioCurrent.findAllRadioCurrent()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/radio/current/id
router.get('/:id', function (req, res, next){
	RadioCurrent.getRadioCurrent(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
