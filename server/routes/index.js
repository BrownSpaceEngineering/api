var router = require('express').Router();

router.use('/receive_data', require('./receiveData'));
router.use('/data', require('./data'));
router.get('/', function (req, res, next){
  res.send("It works!");
});
module.exports = router;
