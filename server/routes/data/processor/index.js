var router = require('express').Router();

router.use('/temperature', require('./processorTemperature'))

module.exports = router;
