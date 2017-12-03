var router = require('express').Router();

router.use('/current', require('./lionCurrent'))
router.use('/temperature', require('./lionTemperature'))
router.use('/voltage', require('./lionVoltage'))

module.exports = router;
