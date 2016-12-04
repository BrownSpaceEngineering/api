var router = require('express').Router();

router.use('/errors', require('./error_codes'));
// router.use('/data', require('./data'));

module.exports = router;
