var router = require('express').Router();
var ErrorCode = require('../common/errorCode');

// Returns all error codes ever in database
router.get('/', function (req, res, next) {
  ErrorCode.findAllErrorCodes()
  .then(function(errorCodes){
    res.send(errorCodes);
  })

})

// Write a new error code to the database
router.post('/:error', function (req, res , next ) {
  ErrorCode.addErrorCode(req.params['error'])
  .then(function(createdError) {
    res.send(createdError);
  })
})

// Return error with id 'id'
router.get('/:id', function (req, res, next) {
  ErrorCode.getErrorCodeByID(id)
  .then(function(errorCode){
    res.send(errorCode);
  })

})

// Return all errors of type 'type'
router.get('/getByType/:type', function(req, res, next) {
  ErrorCode.getErrorCodesByType(req.params['type'])
  .then(function(errorCodes) {
    res.send(errorCodes);
  })
})

// Delete error with id 'id'
router.delete('/:id', function(req, res, next) {
  ErrorCode.deleteErrorCode(req.params['id'])
  .then(function() {
    res.status(200).end()
  })
})

// Update the error with id 'id' with new error 'error'
router.put('/:id/:error', function (req, res, next) {
  ErrorCode.updateErrorCode(req.params['id'], req.params['error'])
  .then(function(updatedError) {
    res.status(201).send(updatedError)
  })
})



module.exports = router;
