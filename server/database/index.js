'use strict';

var db = require('./_db');
module.exports = db;

// Declare model relationships

var Raw = require('./models/raw')
var Preamble = require('./models/preamble');
var ErrorInfo = require('./models/errorInfo');

var CurrBatteryChargingAnalogVoltage = require('./models/currentData/battery/currBatteryChargingAnalogVoltage');
var CurrBatteryChargingDigitalSignal = require('./models/currentData/battery/currBatteryChargingDigitalSignal');
var CurrBatteryTemperature = require('./models/currentData/battery/currBatteryTemperature');

var CurrImuAccelerometer = require('./models/currentData/imu/currImuAccelerometer');
var CurrImuGyroscope = require('./models/currentData/imu/currImuGyroscope');
var CurrImuMagnetometer = require('./models/currentData/imu/currImuMagnetometer');

var CurrLastFlashLedCurrent = require('./models/currentData/lastFlash/currLastFlashLedCurrent');
var CurrLastFlashLedTemperature = require('./models/currentData/lastFlash/currLastFlashLedTemperature');
var CurrLastFlashLifepoCurrent = require('./models/currentData/lastFlash/currLastFlashLifepoCurrent');

var CurrLionCurrent = require('./models/currentData/lion/currLionCurrent');
var CurrLionDischarge = require('./models/currentData/lion/currLionDischarge');
var CurrLionVoltage = require('./models/currentData/lion/currLionVoltage');

var CurrRadioTemperature = require('./models/currentData/radio/currRadioTemperature');
var CurrRadioVoltage = require('./models/currentData/radio/currRadioVoltage');

var CurrDigitalOutput = require('./models/currentData/currDigitalOutput');
var CurrIrReading = require('./models/currentData/currIrReading');
var CurrPhotoDiode = require('./models/currentData/currPhotoDiode');

var RadioTransmissionCurrent = require('./models/dataRadioTransmission/radioTransmissionCurrent');
var RadioTransmissionLionVoltage = require('./models/dataRadioTransmission/radioTransmissionLionVoltage');
var RadioTransmissionTemperature = require('./models/dataRadioTransmission/radioTransmissionTemperature');

var FlashBurstLifepoCurrent = require('./models/dataFlashBurst/flashBurstLifepoCurrent');
var FlashBurstLifepoVoltage = require('./models/dataFlashBurst/flashBurstLifepoVoltage');
var FlashBurstTemperature = require('./models/dataFlashBurst/flashBurstTemperature');

var AttitudeImuAccelerometer = require('./models/dataAttitude/attitudeImuAccelerometer');
var AttitudeImuGyroscope= require('./models/dataAttitude/attitudeImuGyroscope');
var AttitudeImuMagnetometer = require('./models/dataAttitude/attitudeImuMagnetometer');
var AttitudeIrSensor = require('./models/dataAttitude/attitudeIrSensor');
var AttitudeMagnetometer = require('./models/dataAttitude/attitudeMagnetometer');
var AttitudePhotoDiode = require('./models/dataAttitude/attitudePhotoDiode');

Preamble.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
ErrorInfo.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})

CurrBatteryChargingAnalogVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrBatteryChargingDigitalSignal.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrBatteryTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})

CurrImuAccelerometer.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrImuGyroscope.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrImuMagnetometer.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})

CurrLastFlashLedCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrLastFlashLedTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrLastFlashLifepoCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})

CurrLionCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrLionDischarge.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrLionVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})

CurrRadioTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrRadioVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})

CurrDigitalOutput.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrIrReading.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
CurrPhotoDiode.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})

RadioTransmissionCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
RadioTransmissionLionVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
RadioTransmissionTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})

FlashBurstLifepoCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
FlashBurstLifepoVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
FlashBurstTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})

AttitudeImuAccelerometer.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
AttitudeImuGyroscope.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
AttitudeImuMagnetometer.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
AttitudeIrSensor.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
AttitudeMagnetometer.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
AttitudePhotoDiode.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'})
