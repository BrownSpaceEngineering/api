var router = require('express').Router();

router.use('/accelerometer', require('./imuAccelerometer'))
router.use('/gyroscope', require('./imuGyroscope'))
router.use('/magnetometer', require('./imuMagnetometer'))

module.exports = router;
