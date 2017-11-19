var router = require('express').Router();

router.use('/flashCompLedCurrent', require('./flashCompLedCurrent'))
router.use('/flashCompLedTemperature', require('./flashCompLedTemperature'))
router.use('/flashCompLifepoCurrent', require('./flashCompLifepoCurrent'))
router.use('/flashCompLifepoVoltage', require('./flashCompLifepoVoltage'))

module.exports = router;
