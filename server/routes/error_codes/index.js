var router = require('express').Router();

// Returns all error codes ever in database
router.get('/', function (req, res, next) {
  // Using Sequelize, query the database in error tables for all error codes and return with status 100
})


// router.get('/:id')

// router.post('/')

// router.put('/:id')

module.exports = router;
