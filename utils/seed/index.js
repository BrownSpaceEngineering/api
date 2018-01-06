var generateRaw = require('./raw');
var generatePreamble = require('./preamble');

// var generateErrorInfo = require('./errorInfo');
// var generateCurrentData = require('./currentData');
// var generateAttitudeData = require('./dataAttitude');
// var generateFlashBurstData = require('./dataFlashBurst');
// var generateIdleData = require('./idleData');

function generateTransmission () {
  return {
    raw: generateRaw(),
    preamble: generatePreamble()
  }
}

module.exports = generateTransmission;
