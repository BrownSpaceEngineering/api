'use strict';

var db = require('./_db');
module.exports = db;

// Declare model relationships

var Raw = require('./models/raw');
var Preamble = require('./models/preamble');
var ErrorInfo = require('./models/errorInfo');

var CurrBatteryChargingAnalogVoltage = require('./models/currentData/currBatteryChargingAnalogVoltage');
var CurrBatteryChargingDigitalSignal = require('./models/currentData/currBatteryChargingDigitalSignal');
var CurrLionCurrent = require('./models/currentData/currLionCurrent');
var CurrLionVoltage = require('./models/currentData/currLionVoltage');
var CurrDigitalOutput = require('./models/currentData/currDigitalOutput');

var AttitudeImuAccelerometer = require('./models/dataAttitude/attitudeImuAccelerometer');
var AttitudeImuGyroscope= require('./models/dataAttitude/attitudeImuGyroscope');
var AttitudeImuMagnetometer = require('./models/dataAttitude/attitudeImuMagnetometer');
var AttitudeIrTemperature = require('./models/dataAttitude/attitudeIrTemperature');
var AttitudePhotoDiode = require('./models/dataAttitude/attitudePhotoDiode');

var FlashBurstLifepoCurrent = require('./models/dataFlashBurst/flashBurstLifepoCurrent');
var FlashBurstLifepoVoltage = require('./models/dataFlashBurst/flashBurstLifepoVoltage');
var FlashBurstTemperature = require('./models/dataFlashBurst/flashBurstTemperature');

var FlashCompLedCurrent = require('./models/dataFlashComparison/flashCompLedCurrent');
var FlashCompLedTemperature = require('./models/dataFlashComparison/flashCompLedTemperature');
var FlashCompLifepoCurrent = require('./models/dataFlashComparison/flashCompLifepoCurrent');
var FlashCompLifepoVoltage = require('./models/dataFlashComparison/flashCompLifepoVoltage');

var Idle33VRailVoltage = require('./models/idleData/idle33VRailVoltage');
var Idle5VRailVoltage = require('./models/idleData/idle5VRailVoltage');
var IdleBatteryTemperature = require('./models/idleData/idleBatteryTemperature');
var IdleImuTemperature = require('./models/idleData/idleImuTemperature');
var IdleIrAmbientTemperature = require('./models/idleData/idleIrAmbientTemperature');
var IdleRadioTemperature = require('./models/idleData/idleRadioTemperature');
var IdleRadioVoltage = require('./models/idleData/idleRadioVoltage');



Preamble.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
ErrorInfo.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

CurrBatteryChargingAnalogVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
CurrBatteryChargingDigitalSignal.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
CurrLionCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
CurrLionVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
CurrDigitalOutput.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

AttitudeImuAccelerometer.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
AttitudeImuGyroscope.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
AttitudeImuMagnetometer.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
AttitudeIrTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
AttitudePhotoDiode.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

FlashBurstLifepoCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
FlashBurstLifepoVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
FlashBurstTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

FlashCompLedCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
FlashCompLedTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
FlashCompLifepoCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
FlashCompLifepoVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

Idle33VRailVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
Idle5VRailVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
IdleBatteryTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
IdleImuTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
IdleIrAmbientTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
IdleRadioTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
IdleRadioVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
