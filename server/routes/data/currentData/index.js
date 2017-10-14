var router = require('express').Router();

// Battery
router.use('/currBatteryChargingAnalogVoltage', require('./battery/currBatteryChargingAnalogVoltage'))
router.use('/currBatteryChargingDigitalSignal', require('./battery/currBatteryChargingDigitalSignal'))
router.use('/currBatteryTemperature', require('./battery/currBatteryTemperature'))

// IMU
router.use('/currImuAccelerometer', require('./imu/currImuAccelerometer'))
router.use('/currImuGyroscope', require('./imu/currImuGyroscope'))
router.use('/currImuMagnetometer', require('./imu/currImuMagnetometer'))

// LastFlash
router.use('/currLastFlashLedCurrent', require('./lastFlash/currLastFlashLedCurrent'))
router.use('/currLastFlashLedTemperature', require('./lastFlash/currLastFlashLedTemperature'))
router.use('/currLastFlashLifepoCurrent', require('./lastFlash/currLastFlashLifepoCurrent'))

// Lion
router.use('/currLionCurrent', require('./lion/currLionCurrent'))
router.use('/currLionDischarge', require('./lion/currLionDischarge'))
router.use('/currLionVoltage', require('./lion/currLionVoltage'))

// Radio
router.use('/currRadioTemperature', require('./radio/currRadioTemperature'))
router.use('/currRadioVoltage', require('./radio/currRadioVoltage'))

router.use('/currDigitalOutput', require('./currDigitalOutput'))
router.use('/currIrReading', require('./currIrReading'))
router.use('/currPhotoDiode', require('./currPhotoDiode'))

module.exports = router;