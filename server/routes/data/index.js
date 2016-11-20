var router = require('express').Router();

// Returns all data in database
router.get('/', function(req, res, next) {
  // Using Sequelize findAll, query database for all data
})

router.use('/temperature', require('./temperature'));

router.get('/:cat/timecode/:time')

//TODO: query parsing for multiple times
/*router.get('/:cat/range/:time1', function(req, res, next) {
//get time2 param from req,

})*/

//router.get('/:cat')




module.exports = router;
