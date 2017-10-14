var router = require('express').Router();
var Raw = require('../common/raw');

router.get('/', function (req, res, next){
  Raw.findAllRaw()
  .then(function (raws){
    res.send(raws);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/:id', function (req, res, next){
  Raw.getRawById(req.params.id)
  .then(function (raw){
    res.send(raw);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
