var router = require('express').Router();

router.use('/radioTransmissionCurrent', require('./radioTransmissionCurrent'))
router.use('/radioTransmissionLionVoltage', require('./radioTransmissionLionVoltage'))
router.use('/radioTransmissionTemperature', require('./radioTransmissionTemperature'))

module.exports = router;
