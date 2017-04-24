var router = require('express').Router();
var ErrorInfo = require('../common/errorInfo');

// Get all errorInfo
router.get('/', function(req, res, next){
  ErrorInfo.findAllErrorInfos()
  .then(function(errorInfos){ // After finding error Infos, send to client
    res.send(errorInfos);
  })
  .catch(function(err){ // If something went wrong, console log the error to server logs and send back the error with an error status
    console.error(err);
    res.status(500).send(err);
  })
})

// Add a new errorInfo
router.post('/', function(req, res, next){
  var errorToCreate = req.body;
  ErrorInfo.addErrorInfo(errorToCreate)
  .then(function(createdErrorInfo){
    res.send(createdErrorInfo);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send(err);
  })
})

// Delete a specific error Info by its id (will probably need admin status?)
router.delete('/:id', function(req, res, next){
  ErrorInfo.deleteErrorInfo(req.params.id)
  .then(function(){
    res.send("Successfully deleted");
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send(err);
  })
})

// Get a specific errorInfo by its unique id
router.get('/:id', function(req, res, next){
  ErrorInfo.getErrorInfoById(req.params.id)
  .then(function(errorInfo){
    res.send(errorInfo);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send(err);
  })
})

// Get errorInfos from a specific transmission
router.get('/tid/:tid', function(req, res, next){
  ErrorInfo.getErrorInfosByTid(req.params.tid)
  .then(function(errorInfos){
    res.send(errorInfos);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send(err);
  })
})




module.exports = router;
