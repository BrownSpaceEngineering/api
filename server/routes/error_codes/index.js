var router = require('express').Router();
var db = require('../../database/_db');

var Error_code = db.model('error');

// Returns all error codes ever in database
router.get('/', function (req, res, next) {
  // Using Sequelize, query the database in error tables for all error codes and return with status 100
  Error_code.findAll()
  .then(function(codes){
    console.log(codes);
    res.send(codes);
  })

})

// Return all instances where error code 'id' has occured
router.get('/:id', function (req, res, next) {
	// Using Sequelize, query the database in error tables for error code = 'id'
})

// Write a new error code to the database
router.post('/', function (req, res , next ) {
	// Using Sequelize, write a new error to the database
})

// Update the database entry for a given error code
router.put('/:id', function (req, res, next) {
	// Using Sequelize, update the database in error tables where error code = 'id'
})

module.exports = router;
