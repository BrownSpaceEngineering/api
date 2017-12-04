var router = require('express').Router();

router.use('/photodiode', require('./photodiode'))

module.exports = router;
