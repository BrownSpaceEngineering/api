var router = require('express').Router();

router.use('/attitudeImuAccelerometer', require('./attitudeImuAccelerometer'));
router.use('/attitudeImuGyroscope', require('./attitudeImuGyroscope'));
router.use('/attitudeImuMagnetometer', require('./attitudeImuMagnetometer'));
router.use('/attitudeIrSensor', require('./attitudeIrSensor'));
router.use('/attitudeMagnetometer', require('./attitudeMagnetometer'));
router.use('/attitudePhotoDiode', require('./attitudePhotoDiode'));

module.exports = router;
