var router = require('express').Router();

router.use('/eventHistory', require('./eventHistory'))

module.exports = router;
