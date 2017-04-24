var router = require('express').Router();

router.use('/receive_data', require('./receiveData'));
// router.use('/error_codes', require('./errorCodes'));
router.use('/data', require('./data'));

module.exports = router;
