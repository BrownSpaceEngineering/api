var router = require('express').Router();

router.use('/analogVoltage', require('./batteryChargingAnalogVoltage'))
router.use('/digitalSignal', require('./batteryChargingDigitalSignal'))

module.exports = router;
