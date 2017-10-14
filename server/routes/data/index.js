var router = require('express').Router();

router.use('/errorInfo', require('./errorInfo'));
router.use('/preamble', require('./preamble'));
router.use('/raw', require('./raw'));
router.use('/dataAttitude', require('./dataAttitude'));

module.exports = router;
