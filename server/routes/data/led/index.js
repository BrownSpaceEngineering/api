var router = require('express').Router();

router.use('/current', require('./ledCurrent'))
router.use('/temperature', require('./ledTemperature'))

module.exports = router;
