var router = require('express').Router();

var Preamble = require('./../../database/models/preamble.js');
var Raw = require('./../../database/models/raw.js');
var ErrorInfo = require('./../../database/models/errorInfo.js');

var CurrBatteryChargingAnalogVoltage = require('./../../database/models/currentData/battery/currBatteryChargingAnalogVoltage.js')
var CurrBatteryChargingDigitalSignal = require('./../../database/models/currentData/battery/currBatteryChargingDigitalSignal.js')
var CurrBatteryTemperature = require('./../../database/models/currentData/battery/currBatteryTemperature.js')

var CurrImuAccelerometer = require('./../../database/models/currentData/imu/currImuAccelerometer.js')
var CurrImuGyroscope = require('./../../database/models/currentData/imu/currImuGyroscope.js')
var CurrImuMagnetometer = require('./../../database/models/currentData/imu/currImuMagnetometer.js')

var CurrLastFlashLedCurrent = require('./../../database/models/currentData/lastFlash/currLastFlashLedCurrent.js')
var CurrLastFlashLedTemperature = require('./../../database/models/currentData/lastFlash/currLastFlashLedTemperature.js')
var CurrLastFlashLifepoCurrent = require('./../../database/models/currentData/lastFlash/currLastFlashLifepoCurrent.js')

var CurrLionCurrent = require('./../../database/models/currentData/lion/currLionCurrent.js')
var CurrLionDischarge = require('./../../database/models/currentData/lion/currLionDischarge.js')
var CurrLionVoltage = require('./../../database/models/currentData/lion/currLionVoltage.js')

var CurrRadioTemperature = require('./../../database/models/currentData/radio/currRadioTemperature.js')
var CurrRadioVoltage = require('./../../database/models/currentData/radio/currRadioVoltage.js')

var CurrDigitalOutput = require('./../../database/models/currentData/currDigitalOutput.js')
var CurrIrReading = require('./../../database/models/currentData/currIrReading.js')
var CurrPhotoDiode = require('./../../database/models/currentData/currPhotoDiode.js')

var AttitudeImuAccelerometer = require('./../../database/models/dataAttitude/attitudeImuAccelerometer.js')
var AttitudeImuGyroscope = require('./../../database/models/dataAttitude/attitudeImuGyroscope.js')
var AttitudeImuMagnetometer = require('./../../database/models/dataAttitude/attitudeImuMagnetometer.js')
var AttitudeIrSensor = require('./../../database/models/dataAttitude/attitudeIrSensor.js')
var AttitudeMagnetometer = require('./../../database/models/dataAttitude/attitudeMagnetometer.js')
var AttitudePhotoDiode = require('./../../database/models/dataAttitude/attitudePhotoDiode.js')

var FlashBurstLifepoCurrent = require('./../../database/models/dataFlashBurst/flashBurstLifepoCurrent.js')
var FlashBurstLifepoVoltage = require('./../../database/models/dataFlashBurst/flashBurstLifepoVoltage.js')
var FlashBurstTemperature = require('./../../database/models/dataFlashBurst/flashBurstTemperature.js')

var RadioTransmissionCurrent = require('./../../database/models/dataRadioTransmission/radioTransmissionCurrent.js')
var RadioTransmissionLionVoltage = require('./../../database/models/dataRadioTransmission/radioTransmissionLionVoltage.js')
var RadioTransmissionTemperature = require('./../../database/models/dataRadioTransmission/radioTransmissionTemperature.js')

// Main route for receiving data
router.post('/', function(req, res, next){
	saveAll(req.body, res)
});

function saveAll(rawJSON, res) {
	var tid;
	saveRaw(rawJSON)
	.then(function(obj){
		tid = obj.tid
		return savePreamble(rawJSON.preamble, tid)
	})
	.then(function() {
		return saveErrorInfo(rawJSON.error_info, tid)
	}) 
	.then(function() {
		return saveCurrentData(rawJSON.current_data_info, tid)
	})
	.then(function() {
		return saveAttitudeData(rawJSON.data_attitude, tid)
	})
	.then(function() {
		return saveDataFlashBurst(rawJSON.data_flash_burst, tid)
	})
	.then(function() {
		return saveDataRadioTransmission(rawJSON.data_radio_transmission, tid)
	})
	.then(function(){
		return res.sendStatus(200)
	})
	.catch(function(error){
		console.error(error)
		return res.sendStatus(500)
	});
}

function saveRaw(rawJSON) {
	return (Raw.build({
		raw: JSON.stringify(rawJSON)
	}).save())
}

function savePreamble(preamble, tid) {
	return (Preamble.build({
		callsign: preamble.callsign,
		timestamp: preamble.timestamp,
		messageAndOpStates: preamble.message_and_op_states,
		bytesInError: preamble.bytes_in_error,
		bytesInMessage: preamble.bytes_in_message,
		tid: tid
	}).save())
}

function saveErrorInfo(errorInfo, tid) {
	var promises = []
	var errorArray = errorInfo.error
	for(var i = 0; i < errorArray.length; i++){
		promises.push(ErrorInfo.build({
			index: i,
			errorCode: errorArray[i],
			tid: tid
		}).save())
	}
	return Promise.all(promises)
}

function saveCurrentData(currentData, tid) {
	var promises = []
	
	// Battery Data
	saveCurrBatteryChargingAnalogVoltage(currentData.battery_charging_analog_voltages, tid, promises)
	saveCurrBatteryChargingDigitalSignal(currentData.battery_charging_digital_signals, tid, promises)
    saveCurrBatteryTemperature(currentData.battery_temperature, tid, promises)

    // IMU Data
    saveCurrImuAccelerometer(currentData.imu_accelerometer, tid, promises)
    saveCurrImuGyroscope(currentData.imu_gyroscope, tid, promises)
    saveCurrImuMagnetometer(currentData.imu_magnetometer, tid, promises)

    // Lastflash Data
    saveCurrLastFlashLedCurrent(currentData.last_flash_led_current, tid, promises)
    saveCurrLastFlashLedTemperature(currentData.last_flash_led_temperature, tid, promises)
    saveCurrLastFlashLifepoCurrent(currentData.last_flash_lifepo_currents, tid, promises)

    // LiON Data
    saveCurrLionCurrent(currentData.lion_currents, tid, promises)
    saveCurrLionDischarge(currentData.lion_discharge, tid, promises)
    saveCurrLionVoltage(currentData.lion_voltages, tid, promises)

    // Radio Data
	saveCurrRadioTemperature(currentData.radio_temperature, tid, promises)
	saveCurrRadioVoltage(currentData.radio_voltage, tid, promises)

	// Other
	saveCurrDigitalOutput(currentData.digital_output, tid, promises)
	saveCurrIrReading(currentData.ir_readings, tid, promises)
	saveCurrPhotoDiode(currentData.photo_diode, tid, promises)

	return Promise.all(promises)
}

function saveCurrBatteryChargingAnalogVoltage(voltages, tid, promises) {
	for(var i = 0; i < voltages.length; i++){
		promises.push(CurrBatteryChargingAnalogVoltage.build({
			index: i,
			voltage: voltages[i],
			tid: tid
		}).save())
	}
}

function saveCurrBatteryChargingDigitalSignal(signals, tid, promises) {
	for(var i = 0; i < signals.length; i++){
		promises.push(CurrBatteryChargingDigitalSignal.build({
			index: i, 
			signal: signals[i],
			tid: tid
		}).save())
	}
}

function saveCurrBatteryTemperature(temperatures, tid, promises) {
	for(var i = 0; i < temperatures.length; i++){
		promises.push(CurrBatteryTemperature.build({
			index: i, 
			temperature: temperatures[i],
			tid: tid
		}).save())
	}
}

function saveCurrImuAccelerometer(accelerometer, tid, promises) {
	for(var i = 0; i < accelerometer.length; i++){
		promises.push(CurrImuAccelerometer.build({
			index: i, 
			accelerometer: accelerometer[i],
			tid: tid
		}).save())
	}
}

function saveCurrImuGyroscope(gyroscope, tid, promises) {
	for(var i = 0; i < gyroscope.length; i++){
		promises.push(CurrImuGyroscope.build({
			index: i, 
			gyroscope: gyroscope[i],
			tid: tid
		}).save())
	}
}

function saveCurrImuMagnetometer(magnetometer, tid, promises) {
	for(var i = 0; i < magnetometer.length; i++){
		promises.push(CurrImuMagnetometer.build({
			index: i, 
			magnetometer: magnetometer[i],
			tid: tid
		}).save())
	}
}

function saveCurrLastFlashLedCurrent(lastFlashLedCurrent, tid, promises) {
	for(var i = 0; i < lastFlashLedCurrent.length; i++){
		promises.push(CurrLastFlashLedCurrent.build({
			index: i, 
			current: lastFlashLedCurrent[i],
			tid: tid
		}).save())
	}
}

function saveCurrLastFlashLedCurrent(lastFlashLedCurrent, tid, promises) {
	for(var i = 0; i < lastFlashLedCurrent.length; i++){
		promises.push(CurrLastFlashLedCurrent.build({
			index: i, 
			current: lastFlashLedCurrent[i],
			tid: tid
		}).save())
	}
}

function saveCurrLastFlashLedTemperature(temperature, tid, promises) {
	for(var i = 0; i < temperature.length; i++){
		promises.push(CurrLastFlashLedTemperature.build({
			index: i, 
			temperature: temperature[i],
			tid: tid
		}).save())
	}
}

function saveCurrLastFlashLifepoCurrent(current, tid, promises) {
	for(var i = 0; i < current.length; i++){
		promises.push(CurrLastFlashLifepoCurrent.build({
			index: i, 
			current: current[i],
			tid: tid
		}).save())
	}
}

function saveCurrLionCurrent(current, tid, promises) {
	for(var i = 0; i < current.length; i++){
		promises.push(CurrLionCurrent.build({
			index: i, 
			current: current[i],
			tid: tid
		}).save())
	}
}

function saveCurrLionCurrent(current, tid, promises) {
	for(var i = 0; i < current.length; i++){
		promises.push(CurrLionCurrent.build({
			index: i, 
			current: current[i],
			tid: tid
		}).save())
	}
}

function saveCurrLionDischarge(discharge, tid, promises) {
	for(var i = 0; i < discharge.length; i++){
		promises.push(CurrLionDischarge.build({
			index: i, 
			discharge: discharge[i],
			tid: tid
		}).save())
	}
}

function saveCurrLionVoltage(voltage, tid, promises) {
	for(var i = 0; i < voltage.length; i++){
		promises.push(CurrLionVoltage.build({
			index: i, 
			voltage: voltage[i],
			tid: tid
		}).save())
	}
}

function saveCurrRadioTemperature(temperature, tid, promises) {
	promises.push(CurrRadioTemperature.build({
		temperature: temperature, 
		tid: tid
	}).save())
}

function saveCurrRadioVoltage(voltage, tid, promises) {
	for(var i = 0; i < voltage.length; i++){
		promises.push(CurrRadioVoltage.build({
			index: i, 
			voltage: voltage[i],
			tid: tid
		}).save())
	}
}

function saveCurrDigitalOutput(digitalOutput, tid, promises) {
	promises.push(CurrDigitalOutput.build({
		index: 0, //NOTE: WHAT IS THIS INDEX FOR?
		output: digitalOutput,
		tid: tid
	}).save())
}

function saveCurrIrReading(reading, tid, promises) {
	for(var i = 0; i < reading.length; i++){
		promises.push(CurrIrReading.build({
			index: i, 
			reading: reading[i],
			tid: tid
		}).save())
	}
}

function saveCurrPhotoDiode(diode, tid, promises) {
	for(var i = 0; i < diode.length; i++){
		promises.push(CurrPhotoDiode.build({
			index: i, 
			diode: diode[i],
			tid: tid
		}).save())
	}
}

function saveAttitudeData(attitude, tid) {
	var promises = []
	saveAttitudeImuAccelerometer(attitude.imu_accelerometer, tid, attitude.timestamp, promises)
	saveAttitudeImuGyroscope(attitude.imu_gyroscope, tid, attitude.timestamp, promises)
	saveAttitudeImuMagnetometer(attitude.imu_magnetometer, tid, attitude.timestamp, promises)
	saveAttitudeIrSensor(attitude.ir_sensor, tid, attitude.timestamp, promises)
	saveAttitudeMagnetometer(attitude.magnetometer, tid, attitude.timestamp, promises)
	saveAttitudePhotoDiode(attitude.photo_diode, tid, attitude.timestamp, promises)
	return Promise.all(promises)
}

function saveAttitudeImuAccelerometer(accelerometer, tid, timestamp, promises) {
	for(var i = 0; i < accelerometer.length; i++){
		promises.push(AttitudeImuAccelerometer.build({
			index: i, 
			accelerometer: accelerometer[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

function saveAttitudeImuGyroscope(gyroscope, tid, timestamp, promises) {
	for(var i = 0; i < gyroscope.length; i++){
		promises.push(AttitudeImuGyroscope.build({
			index: i, 
			gyroscope: gyroscope[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

function saveAttitudeImuMagnetometer(magnetometer, tid, timestamp, promises) {
	for(var i = 0; i < magnetometer.length; i++){
		promises.push(AttitudeImuMagnetometer.build({
			index: i, 
			magnetometer: magnetometer[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

function saveAttitudeIrSensor(sensor, tid, timestamp, promises) {
	for(var i = 0; i < sensor.length; i++){
		promises.push(AttitudeIrSensor.build({
			index: i, 
			sensor: sensor[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

function saveAttitudeMagnetometer(magnetometer, tid, timestamp, promises) {
	promises.push(AttitudeMagnetometer.build({
		magnetometer: magnetometer,
		tid: tid,
		timestamp: timestamp
	}).save())
}

function saveAttitudePhotoDiode(diode, tid, timestamp, promises) {
	for(var i = 0; i < diode.length; i++){
		promises.push(AttitudePhotoDiode.build({
			index: i, 
			diode: diode[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

function saveDataFlashBurst(flashBurst, tid) {
	var promises = []
	saveFlashBurstLifepoCurrent(flashBurst.lifepo_current, tid, flashBurst.timestamp, promises)
	saveFlashBurstLifepoVoltage(flashBurst.lifepo_voltage, tid, flashBurst.timestamp, promises)
	saveFlashBurstTemperature(flashBurst.temperature, tid, flashBurst.timestamp, promises)
	return Promise.all(promises)
}

function saveFlashBurstLifepoCurrent(current, tid, timestamp, promises) {
	for(var i = 0; i < current.length; i++){
		promises.push(FlashBurstLifepoCurrent.build({
			index: i, 
			current: current[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

function saveFlashBurstLifepoVoltage(voltage, tid, timestamp, promises) {
	for(var i = 0; i < voltage.length; i++){
		promises.push(FlashBurstLifepoVoltage.build({
			index: i, 
			voltage: voltage[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

function saveFlashBurstTemperature(temperature, tid, timestamp, promises) {
	for(var i = 0; i < temperature.length; i++){
		promises.push(FlashBurstTemperature.build({
			index: i, 
			temperature: temperature[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

function saveDataRadioTransmission(radio, tid) {
	var promises = []
	saveRadioTransmissionCurrent(radio.lion_currents, tid, radio.timestamp, promises)
	saveRadioTransmissionVoltage(radio.lion_voltages, tid, radio.timestamp, promises)
	saveRadioTransmissionTemperature(radio.radio_temperature, tid, radio.timestamp, promises)
	return Promise.all(promises)
}

function saveRadioTransmissionCurrent(current, tid, timestamp, promises) {
	for(var i = 0; i < current.length; i++){
		promises.push(RadioTransmissionCurrent.build({
			index: i, 
			current: current[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

function saveRadioTransmissionVoltage(voltage, tid, timestamp, promises) {
	for(var i = 0; i < voltage.length; i++){
		promises.push(RadioTransmissionLionVoltage.build({
			index: i, 
			voltage: voltage[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

function saveRadioTransmissionTemperature(temperature, tid, timestamp, promises) {
	for(var i = 0; i < temperature.length; i++){
		promises.push(RadioTransmissionTemperature.build({
			index: i, 
			temperature: temperature[i],
			tid: tid,
			timestamp: timestamp
		}).save())
	}
}

module.exports = router;
