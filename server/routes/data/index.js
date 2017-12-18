var router = require('express').Router();

router.use('/errorInfo', require('./errorInfo'));
router.use('/preamble', require('./preamble'));
router.use('/raw', require('./raw'));



router.use('/batteryCharging', require('./batteryCharging'));
router.use('/currentData', require('./currentData'));
router.use('/eventHistory', require('./eventHistory'));
router.use('/imu', require('./imu'));
router.use('/irSensor', require('./irSensor'));
router.use('/led', require('./led'));
router.use('/lifepo', require('./lifepo'));
router.use('/lion', require('./lion'));
router.use('/photodiode', require('./photodiode'));
router.use('/processor', require('./processor'));
router.use('/radio', require('./radio'));


module.exports = router;
