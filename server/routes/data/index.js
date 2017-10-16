var router = require('express').Router();

router.use('/errorInfo', require('./errorInfo'));
router.use('/preamble', require('./preamble'));
router.use('/currentData', require('./currentData'));

router.use('/raw', require('./raw'));
router.use('/dataFlashBurst', require('./dataFlashBurst'));
router.use('/dataAttitude', require('./dataAttitude'));
router.use('/dataRadioTransmission', require('./dataRadioTransmission'));

module.exports = router;
