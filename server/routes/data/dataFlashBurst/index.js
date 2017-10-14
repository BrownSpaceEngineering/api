var router = require('express').Router();

router.use('/flashBurstLifepoCurrent', require('./flashBurstLifepoCurrent'))
router.use('/flashBurstLifepoVoltage', require('./flashBurstLifepoVoltage'))
router.use('/flashBurstTemperature', require('./flashBurstTemperature'))

module.exports = router;