var router = require('express').Router();

var Preamble = require('./../common/preamble.js');
var Raw = require('./../common/raw.js');
var ErrorInfo = require('./../common/errorInfo.js');

var CurrBatteryChargingAnalogVoltage = require('./../common/currentData/battery/currBatteryChargingAnalogVoltage.js')
var CurrBatteryChargingDigitalSignal = require('./../common/currentData/battery/currBatteryChargingDigitalSignal.js')
var CurrBatteryTemperature = require('./../common/currentData/battery/currBatteryTemperature.js')

var CurrImuAccelerometer = require('./../common/currentData/imu/currImuAccelerometer.js')
var CurrImuGyroscope = require('./../common/currentData/imu/currImuGyroscope.js')
var CurrImuMagnetometer = require('./../common/currentData/imu/currImuMagnetometer.js')

var CurrLastFlashLedCurrent = require('./../common/currentData/lastFlash/currLastFlashLedCurrent.js')
var CurrLastFlashLedTemperature = require('./../common/currentData/lastFlash/currLastFlashLedTemperature.js')
var CurrLastFlashLifepoCurrent = require('./../common/currentData/lastFlash/currLastFlashLifepoCurrent.js')

var CurrLionCurrent = require('./../common/currentData/lion/currLionCurrent.js')
var CurrLionDischarge = require('./../common/currentData/lion/currLionDischarge.js')
var CurrLionVoltage = require('./../common/currentData/lion/currLionVoltage.js')

var CurrRadioTemperature = require('./../common/currentData/radio/currRadioTemperature.js')
var CurrRadioVoltage = require('./../common/currentData/radio/currRadioVoltage.js')

var CurrDigitalOutput = require('./../common/currentData/currDigitalOutput.js')
var CurrIrReading = require('./../common/currentData/currIrReading.js')
var CurrPhotoDiode = require('./../common/currentData/currPhotoDiode.js')

var AttitudeImuAccelerometer = require('./../common/dataAttitude/attitudeImuAccelerometer.js')
var AttitudeImuGyroscope = require('./../common/dataAttitude/attitudeImuGyroscope.js')
var AttitudeImuMagnetometer = require('./../common/dataAttitude/attitudeImuMagnetometer.js')
var AttitudeIrSensor = require('./../common/dataAttitude/attitudeIrSensor.js')
var AttitudeMagnetometer = require('./../common/dataAttitude/attitudeMagnetometer.js')
var AttitudePhotoDiode = require('./../common/dataAttitude/attitudePhotoDiode.js')

var FlashBurstLifepoCurrent = require('./../common/dataFlashBurst/flashBurstLifepoCurrent.js')
var FlashBurstLifepoVoltage = require('./../common/dataFlashBurst/flashBurstLifepoVoltage.js')
var FlashBurstTemperature = require('./../common/dataFlashBurst/flashBurstTemperature.js')

var RadioTransmissionCurrent = require('./../common/dataRadioTransmission/radioTransmissionCurrent.js')
var RadioTransmissionLionVoltage = require('./../common/dataRadioTransmission/radioTransmissionLionVoltage.js')
var RadioTransmissionTemperature = require('./../common/dataRadioTransmission/radioTransmissionTemperature.js')

// Main route for receiving data
// Endpoint: /api/receive_data
router.post('/', function(req, res, next) {
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
	return Raw.addRaw({
		raw: JSON.stringify(rawJSON)
	})
}

function savePreamble(preamble, tid) {
	return Preamble.addPreamble({
		callsign: preamble.callsign,
		timestamp: preamble.timestamp,
		messageAndOpStates: preamble.message_and_op_states,
		bytesInError: preamble.bytes_in_error,
		bytesInMessage: preamble.bytes_in_message,
		tid: tid
	})
}

function saveErrorInfo(errorInfo, tid) {
	var promises = []
	var errorArray = errorInfo.error
	for(var i = 0; i < errorArray.length; i++){
		promises.push(ErrorInfo.addErrorInfo({
			index: i,
			errorCode: errorArray[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrentData(currentData, tid) {	
	return saveCurrBatteryChargingAnalogVoltage(currentData.battery_charging_analog_voltages, tid)
	.then(function() {
		return saveCurrBatteryChargingDigitalSignal(currentData.battery_charging_digital_signals, tid)
	})
	.then(function() {
		return saveCurrBatteryTemperature(currentData.battery_temperature, tid)
	})
	.then(function() {
		return saveCurrImuAccelerometer(currentData.imu_accelerometer, tid)
	})
	.then(function() {
    	return saveCurrImuGyroscope(currentData.imu_gyroscope, tid)
	})
	.then(function() {
		return saveCurrImuMagnetometer(currentData.imu_magnetometer, tid)
	})
	.then(function() {
		return saveCurrLastFlashLedCurrent(currentData.last_flash_led_current, tid)
	})
	.then(function() {
		return saveCurrLastFlashLedTemperature(currentData.last_flash_led_temperature, tid)
	})
	.then(function() {
		return saveCurrLastFlashLifepoCurrent(currentData.last_flash_lifepo_currents, tid)
	})
	.then(function() {
		return saveCurrLionCurrent(currentData.lion_currents, tid)
	})
	.then(function() {
		return saveCurrLionDischarge(currentData.lion_discharge, tid)
	})
	.then(function() {
		return saveCurrLionVoltage(currentData.lion_voltages, tid)
	})
	.then(function() {
		return saveCurrRadioTemperature(currentData.radio_temperature, tid)
	})
	.then(function() {
		return saveCurrRadioVoltage(currentData.radio_voltage, tid)
	})
	.then(function() {
		return saveCurrDigitalOutput(currentData.digital_output, tid)
	})
	.then(function() {
		return saveCurrIrReading(currentData.ir_readings, tid)
	})
	.then(function() {
		return saveCurrPhotoDiode(currentData.photo_diode, tid)
	})
	.catch(function(error) {
		throw error
	})
}

function saveCurrBatteryChargingAnalogVoltage(voltages, tid) {
	var promises = []
	for(var i = 0; i < voltages.length; i++){
		promises.push(CurrBatteryChargingAnalogVoltage.addCurrBatteryChargingAnalogVoltage({
			index: i,
			voltage: voltages[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrBatteryChargingDigitalSignal(signals, tid) {
	var promises = []
	for(var i = 0; i < signals.length; i++){
		promises.push(CurrBatteryChargingDigitalSignal.addCurrBatteryChargingDigitalSignal({
			index: i, 
			signal: signals[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrBatteryTemperature(temperatures, tid) {
	var promises = []
	for(var i = 0; i < temperatures.length; i++){
		promises.push(CurrBatteryTemperature.addCurrBatteryTemperature({
			index: i, 
			temperature: temperatures[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrImuAccelerometer(accelerometer, tid) {
	var promises = []
	for(var i = 0; i < accelerometer.length; i++){
		promises.push(CurrImuAccelerometer.addCurrImuAccelerometer({
			index: i, 
			accelerometer: accelerometer[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrImuGyroscope(gyroscope, tid) {
	var promises = []
	for(var i = 0; i < gyroscope.length; i++){
		promises.push(CurrImuGyroscope.addCurrImuGyroscope({
			index: i, 
			gyroscope: gyroscope[i],
			tid: tid
		}))
	}
	return Promise.all(promises)	
}

function saveCurrImuMagnetometer(magnetometer, tid) {
	var promises = []
	for(var i = 0; i < magnetometer.length; i++){
		promises.push(CurrImuMagnetometer.addCurrImuMagnetometer({
			index: i, 
			magnetometer: magnetometer[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrLastFlashLedCurrent(lastFlashLedCurrent, tid) {
	var promises = []
	for(var i = 0; i < lastFlashLedCurrent.length; i++){
		promises.push(CurrLastFlashLedCurrent.addCurrLastFlashLedCurrent({
			index: i, 
			current: lastFlashLedCurrent[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrLastFlashLedCurrent(lastFlashLedCurrent, tid) {
	var promises = []
	for(var i = 0; i < lastFlashLedCurrent.length; i++){
		promises.push(CurrLastFlashLedCurrent.addCurrLastFlashLedCurrent({
			index: i, 
			current: lastFlashLedCurrent[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrLastFlashLedTemperature(temperature, tid) {
	var promises = []
	for(var i = 0; i < temperature.length; i++){
		promises.push(CurrLastFlashLedTemperature.addCurrLastFlashLedTemperature({
			index: i, 
			temperature: temperature[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrLastFlashLifepoCurrent(current, tid) {
	var promises = []
	for(var i = 0; i < current.length; i++){
		promises.push(CurrLastFlashLifepoCurrent.addCurrLastFlashLifepoCurrent({
			index: i, 
			current: current[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrLionCurrent(current, tid) {
	var promises = []
	for(var i = 0; i < current.length; i++){
		promises.push(CurrLionCurrent.addCurrLionCurrent({
			index: i, 
			current: current[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrLionCurrent(current, tid) {
	var promises = []
	for(var i = 0; i < current.length; i++){
		promises.push(CurrLionCurrent.addCurrLionCurrent({
			index: i, 
			current: current[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrLionDischarge(discharge, tid) {
	var promises = []
	for(var i = 0; i < discharge.length; i++){
		promises.push(CurrLionDischarge.addCurrLionDischarge({
			index: i, 
			discharge: discharge[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrLionVoltage(voltage, tid) {
	var promises = []
	for(var i = 0; i < voltage.length; i++){
		promises.push(CurrLionVoltage.addCurrLionVoltage({
			index: i, 
			voltage: voltage[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrRadioTemperature(temperature, tid) {
	return (CurrRadioTemperature.addCurrRadioTemperature({
		temperature: temperature, 
		tid: tid
	}))
}

function saveCurrRadioVoltage(voltage, tid) {
	var promises = []
	for(var i = 0; i < voltage.length; i++){
		promises.push(CurrRadioVoltage.addCurrRadioVoltage({
			index: i, 
			voltage: voltage[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrDigitalOutput(digitalOutput, tid) {
	return (CurrDigitalOutput.addCurrDigitalOutput({
		index: 0, //NOTE: WHAT IS THIS INDEX FOR?
		output: digitalOutput,
		tid: tid
	}))
}

function saveCurrIrReading(reading, tid) {
	var promises = []
	for(var i = 0; i < reading.length; i++){
		promises.push(CurrIrReading.addCurrIrReading({
			index: i, 
			reading: reading[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrPhotoDiode(diode, tid) {
	var promises = []
	for(var i = 0; i < diode.length; i++){
		promises.push(CurrPhotoDiode.addCurrPhotoDiode({
			index: i, 
			diode: diode[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveAttitudeData(attitude, tid) {
	return saveAttitudeImuAccelerometer(attitude.imu_accelerometer, tid, attitude.timestamp)
	.then(function() {
		return saveAttitudeImuGyroscope(attitude.imu_gyroscope, tid, attitude.timestamp)
	})
	.then(function() {
		return saveAttitudeImuMagnetometer(attitude.imu_magnetometer, tid, attitude.timestamp)
	})
	.then(function() {
		return saveAttitudeIrSensor(attitude.ir_sensor, tid, attitude.timestamp)
	})
	.then(function() {
		return saveAttitudeMagnetometer(attitude.magnetometer, tid, attitude.timestamp)
	})
	.then(function() {
		return saveAttitudePhotoDiode(attitude.photo_diode, tid, attitude.timestamp)
	})
	.catch(function(error) {
		throw error
	})
}

function saveAttitudeImuAccelerometer(accelerometer, tid, timestamp) {
	var promises = []
	for(var i = 0; i < accelerometer.length; i++){
		promises.push(AttitudeImuAccelerometer.addAttitudeImuAccelerometer({
			index: i, 
			accelerometer: accelerometer[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveAttitudeImuGyroscope(gyroscope, tid, timestamp) {
	var promises = []
	for(var i = 0; i < gyroscope.length; i++){
		promises.push(AttitudeImuGyroscope.addAttitudeImuGyroscope({
			index: i, 
			gyroscope: gyroscope[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveAttitudeImuMagnetometer(magnetometer, tid, timestamp) {
	var promises = []
	for(var i = 0; i < magnetometer.length; i++){
		promises.push(AttitudeImuMagnetometer.addAttitudeImuMagnetometer({
			index: i, 
			magnetometer: magnetometer[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveAttitudeIrSensor(sensor, tid, timestamp) {
	var promises = []
	for(var i = 0; i < sensor.length; i++){
		promises.push(AttitudeIrSensor.addAttitudeIrSensor({
			index: i, 
			sensor: sensor[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveAttitudeMagnetometer(magnetometer, tid, timestamp) {
	return AttitudeMagnetometer.addAttitudeMagnetometer({
		magnetometer: magnetometer,
		tid: tid,
		timestamp: timestamp
	})
}

function saveAttitudePhotoDiode(diode, tid, timestamp) {
	var promises = []
	for(var i = 0; i < diode.length; i++){
		promises.push(AttitudePhotoDiode.addAttitudePhotoDiode({
			index: i, 
			diode: diode[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveDataFlashBurst(flashBurst, tid) {
	return saveFlashBurstLifepoCurrent(flashBurst.lifepo_current, tid, flashBurst.timestamp)
	.then(function() {
		return saveFlashBurstLifepoVoltage(flashBurst.lifepo_voltage, tid, flashBurst.timestamp)
	})
	.then(function() {
		return saveFlashBurstTemperature(flashBurst.temperature, tid, flashBurst.timestamp)
	})
	.catch(function(error) {
		throw error
	})
}

function saveFlashBurstLifepoCurrent(current, tid, timestamp) {
	var promises = []
	for(var i = 0; i < current.length; i++){
		promises.push(FlashBurstLifepoCurrent.addFlashBurstLifepoCurrent({
			index: i, 
			current: current[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveFlashBurstLifepoVoltage(voltage, tid, timestamp) {
	var promises = []
	for(var i = 0; i < voltage.length; i++){
		promises.push(FlashBurstLifepoVoltage.addFlashBurstLifepoVoltage({
			index: i, 
			voltage: voltage[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveFlashBurstTemperature(temperature, tid, timestamp) {
	var promises = []
	for(var i = 0; i < temperature.length; i++){
		promises.push(FlashBurstTemperature.addFlashBurstTemperature({
			index: i, 
			temperature: temperature[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveDataRadioTransmission(radio, tid) {
	return saveRadioTransmissionCurrent(radio.lion_currents, tid, radio.timestamp)
	.then(function() {
		return saveRadioTransmissionVoltage(radio.lion_voltages, tid, radio.timestamp)
	})
	.then(function() {
		return saveRadioTransmissionTemperature(radio.radio_temperature, tid, radio.timestamp)
	})
	.catch(function(error) {
		throw error
	})
}

function saveRadioTransmissionCurrent(current, tid, timestamp) {
	var promises = []
	for(var i = 0; i < current.length; i++){
		promises.push(RadioTransmissionCurrent.addRadioTransmissionCurrent({
			index: i, 
			current: current[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveRadioTransmissionVoltage(voltage, tid, timestamp) {
	var promises = []
	for(var i = 0; i < voltage.length; i++){
		promises.push(RadioTransmissionLionVoltage.addRadioTransmissionLionVoltage({
			index: i, 
			voltage: voltage[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveRadioTransmissionTemperature(temperature, tid, timestamp) {
	var promises = []
	for(var i = 0; i < temperature.length; i++){
		promises.push(RadioTransmissionTemperature.addRadioTransmissionTemperature({
			index: i, 
			temperature: temperature[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

module.exports = router;
