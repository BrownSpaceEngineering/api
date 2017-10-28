var router = require('express').Router();

router.use('/idle33VRailVoltage', require('./idle33VRailVoltage'))
router.use('/idle5VRailVoltage', require('./idle5VRailVoltage'))
router.use('/idleBatteryTemperature', require('./idleBatteryTemperature'))
router.use('/idleImuTemperature', require('./idleImuTemperature'))
router.use('/idleIrAmbientTemperature', require('./idleIrAmbientTemperature'))
router.use('/idleRadioTemperature', require('./idleRadioTemperature'))
router.use('/idleRadioVoltage', require('./idleRadioVoltage'))

module.exports = router;
