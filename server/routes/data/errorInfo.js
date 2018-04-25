var router = require('express').Router();
var ErrorInfo = require('../common/errorInfo');

// Get all errorInfo
router.get('/', function (req, res, next){
  ErrorInfo.findAllErrorInfo()
  .then(function (errorInfos){ // After finding error Infos, send to client
    res.send(errorInfos);
  })
  .catch(function (err){ // If something went wrong, console log the error to server logs and send back the error with an error status
    console.error(err);
    res.status(500).send(err);
  });
});


// Get a specific errorInfo by its unique id
router.get('/:id', function (req, res, next){
  ErrorInfo.getErrorInfoById(req.params.id)
  .then(function (errorInfo){
    res.send(errorInfo);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

// Get errorInfos from a specific transmission
router.get('/tid/:tid', function (req, res, next){
  ErrorInfo.getErrorInfosByTid(req.params.tid)
  .then(function (errorInfos){
    res.send(errorInfos);
  })
  .catch(function (err){
    console.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;
