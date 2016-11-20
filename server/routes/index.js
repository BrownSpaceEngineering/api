var router = require('express').Router();

router.use('/errors', require('./errors'));
router.use('/data', require('./data'));

module.exports = router;
