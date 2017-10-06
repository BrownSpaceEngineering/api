var router = require('express').Router();

router.use('/errorInfo', require('./errorInfo'));
router.use('/preamble', require('./preamble'));
router.use('/dataFlashBurst', require('./dataFlashBurst'))

// router.use('/raw', require('./raw'));
// router.use('/temperature', require('./temperature'));

module.exports = router;
