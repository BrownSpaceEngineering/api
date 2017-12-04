var router = require('express').Router();

router.use('/rebootCount', require('./currentDataRebootCount'))
router.use('/timeToFlash', require('./currentDataTimeToFlash'))

module.exports = router;
