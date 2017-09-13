var router = require('express').Router();
var Preamble = require('../common/preamble');

router.get('/', function (req, res, next){
  Preamble.findAllPreamble()
  .then(function (preambles){
    res.send(preambles);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.post('/', function (req, res, next){
  var preambleToCreate = req.body;
  Preamble.addPreamble(preambleToCreate)
  .then(function (createdPreamble){
    res.send(createdPreamble);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  Preamble.getPreambleById(req.params.id)
  .then(function (preamble){
    res.send(preamble);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
