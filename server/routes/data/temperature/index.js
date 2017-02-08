var router = require('express').Router();
//DEPRECATED - WE SHOULD BREAK IT UP BY COMPONENT INSTEAD
// Returns all temperature data in database
router.get('/', function(req, res, next) {
  // Using Sequelize findAll, query database for all temperature data
})



module.exports = router;
