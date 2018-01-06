var router = require('express').Router();

router.use('/receive_data', require('./receiveData'));
router.use('/data', require('./data'));

module.exports = router;
