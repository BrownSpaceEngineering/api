var router = require('express').Router();
var Photodiode = require('../../common/photodiode/photodiode');

//Endpoint: /equisat/data/photodiode/photodiode
router.get('/', function (req, res, next){
	Photodiode.findAllPhotodiode()
    .then(function(readings){
    	res.send(readings);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

//Endpoint: /equisat/data/photodiode/photodiode/id
router.get('/:id', function (req, res, next){
	Photodiode.getPhotodiode(req.params.id)
    .then(function(reading){
    	res.send(reading);
    })
	.catch(function (err){
	    console.error(err);
	    res.status(500).send(err);
	});
});

module.exports = router;
