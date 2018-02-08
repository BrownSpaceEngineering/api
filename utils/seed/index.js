var generateRaw = require('./raw');
var generatePreamble = require('./preamble');
var generateCurrentData = require('./currentData');
var generateErrorInfo = require('./errorInfo');
var generateAttitudeData = require('./dataAttitude');
var generateFlashBurstData = require('./dataFlashBurst');
var generateIdleData = require('./idleData');

function generateTransmission () {
  return {
    raw: generateRaw(),
    preamble: generatePreamble(),
    current_data_info: generateCurrentData(),
    error_info: generateErrorInfo(),
    data_attitude: generateAttitudeData(),
    data_flash_burst: generateFlashBurstData(),
    data_idle: generateIdleData()
  }
}

module.exports = generateTransmission;
