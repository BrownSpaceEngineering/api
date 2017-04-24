var router = require('express').Router();

router.use('/errorInfo', require('./errorInfo'));

module.exports = router;
