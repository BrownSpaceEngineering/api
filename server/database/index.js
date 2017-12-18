'use strict';

var db = require('./_db');
module.exports = db;

// Declare model relationships

var Raw = require('./models/raw');
var Preamble = require('./models/preamble');
var ErrorInfo = require('./models/errorInfo');

var BatteryChargingAnalogVoltage = require('./models/batteryCharging/batteryChargingAnalogVoltage');
var BatteryChargingDigitalSignal = require('./models/batteryCharging/batteryChargingDigitalSignal');

var RebootCount = require('./models/currentData/rebootCount');
var TimeToFlash = require('./models/currentData/timeToFlash');

var EventHistory = require('./models/eventHistory/eventHistory');

var ImuGyroscope = require('./models/imu/imuGyroscope');
var ImuMagnetometer = require('./models/imu/imuMagnetometer');
var ImuAccelerometer = require('./models/imu/imuAccelerometer');

var IRAmbientTemperature = require('./models/irSensor/irAmbientTemperature');
var IRObjectTemperature = require('./models/irSensor/irObjectTemperature');

var LEDCurrent = require('./models/led/ledCurrent');
var LEDTemperature = require('./models/led/ledTemperature');

var LifepoCurrent = require('./models/liFePo/liFePoCurrent');
var LifepoTemperature = require('./models/irSensor/liFePoTemperature');
var LifepoVoltage = require('./models/irSensor/liFePoVoltage');

var LiOnCurrent = require('./models/liOn/liOnCurrent');
var LiOnTemperature = require('./models/liOn/liOnTemperature');
var liOnVoltage = require('./models/liOn/liOnVoltage');

var Photodiode = require('./models/photodiode/photodiode');

var ProcessorTemperature = require('./models/processor/processorTemperature');

var RadioCurrent = require('./models/radio/radioCurrent');
var RadioTemperature = require('./models/radio/radioTemperature');


Preamble.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
ErrorInfo.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

BatteryChargingAnalogVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
BatteryChargingDigitalSignal.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

RebootCount.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
TimeToFlash.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

EventHistory.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

ImuGyroscope.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
ImuMagnetometer.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
ImuAccelerometer.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

IRAmbientTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
IRObjectTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

LEDCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
LEDTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

LifepoCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
LifepoTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
LifepoVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

LiOnCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
LiOnTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
liOnVoltage.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

Photodiode.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

ProcessorTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});

RadioCurrent.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
RadioTemperature.belongsTo(Raw, {as: 'Transmission', foreignKey: 'tid'});
