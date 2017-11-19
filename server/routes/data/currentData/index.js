var router = require('express').Router();

router.use('/currBatteryChargingAnalogVoltage', require('./currBatteryChargingAnalogVoltage'))
router.use('/currBatteryChargingDigitalSignal', require('./currBatteryChargingDigitalSignal'))
router.use('/currDigitalOutput', require('./currDigitalOutput'))
router.use('/currLionCurrent', require('./currLionCurrent'))
router.use('/currLionVoltage', require('./currLionVoltage'))


module.exports = router;
