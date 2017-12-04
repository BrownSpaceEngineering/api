var router = require('express').Router();

router.use('/current', require('./lifepoCurrent'))
router.use('/temperature', require('./lifepoTemperature'))
router.use('/voltage', require('./lifepoVoltage'))

module.exports = router;
