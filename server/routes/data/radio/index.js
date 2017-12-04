var router = require('express').Router();

router.use('/current', require('./radioCurrent'))
router.use('/temperature', require('./radioTemperature'))

module.exports = router;
