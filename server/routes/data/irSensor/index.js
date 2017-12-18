var router = require('express').Router();

router.use('/ambientTemperature', require('./irAmbientTemperature'))
router.use('/objectTemperature', require('./irObjectTemperature'))

module.exports = router;
