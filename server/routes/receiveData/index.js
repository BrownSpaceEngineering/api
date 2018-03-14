var router = require('express').Router();

var Preamble = require('./../common/preamble.js');
var Raw = require('./../common/raw.js');
var ErrorInfo = require('./../common/errorInfo.js');


// Battery Charging
var BatteryChargingAnalogVoltage = require('./../common/batteryCharging/batteryChargingAnalogVoltage.js')
var CurrBatteryChargingDigitalSignal = require('./../common/batteryCharging/batteryChargingDigitalSignal.js')

// Current Data
var CurrentDataRebootCount = require('./../common/currentData/currentDataRebootCount.js')
var CurrentDataTimeToFlash = require('./../common/currentData/currentDataTimeToFlash.js')

// Event History
var EventHistory = require('./../common/eventHistory/eventHistory.js')

// IMU
var ImuAccelerometer = require('./../common/imu/imuAccelerometer.js')
var ImuGyroscope = require('./../common/imu/imuGyroscope.js')
var ImuMagnetometer = require('./../common/imu/imuMagnetometer.js')

// IR Sensor
var IrAmbientTemperature = require('./../common/irSensor/irAmbientTemperature.js')
var IrObjectTemperature = require('./../common/irSensor/irObjectTemperature.js')

// LED
var LedCurrent = require('./../common/led/ledCurrent.js')
var LedTemperature = require('./../common/led/ledTemperature.js')

// Lifepo
var LifepoCurrent = require('./../common/lifepo/lifepoCurrent.js')
var LifepoTemperature = require('./../common/lifepo/lifepoTemperature.js')
var LifepoVoltage = require('./../common/lifepo/lifepoVoltage.js')

// Lion
var LionCurrent = require('./../common/lion/lionCurrent.js')
var LionTemperature = require('./../common/lion/lionTemperature.js')
var LionVoltage = require('./../common/lion/lionVoltage.js')

// Photodiode
var Photodiode = require('./../common/photodiode/photodiode.js')

// Processor
var ProcessorTemperature = require('./../common/processor/processorTemperature.js')

// Radio
var RadioCurrent = require('./../common/radio/radioCurrent.js')
var RadioTemperature = require('./../common/radio/radioTemperature.js')


/*
{
	payload: 'buffer',
	seed: true
}
*/


//Byte conversion
// var Parser = require('./../../../utils/byte_conversion/parsing.js')

// Main route for receiving data
// Endpoint: /equisat/receive_data
router.post('/', function(req, res, next) {
	if (req.body.seed) {
		saveAll(req.body.payload)
	} else {
		var buf = Buffer(req.body.payload)
		var json = Parser.Parser.parse(buf)
		saveAll(json, res)
	}
});

function saveAll(rawJSON, res) {
	var tid;
	var timestamp;
	saveRaw(rawJSON)
	.then(function(obj){
		tid = obj.tid
		timestamp = rawJSON.preamble.timestamp
		return savePreamble(rawJSON.preamble, tid)
	})
	.then(function(obj) {
		return saveCurrentData(rawJSON.current_data, timestamp, tid)
	})
	.then(function(obj) {
		return saveMessage(rawJSON, tid)
	})
	.then(function(obj) {
		return saveErrorInfo(rawJSON.errors, timestamp, tid)
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

function saveMessage(message, tid) {
	var promises = []
	for (var key in message.packages) {
		if (message.message_type == 0) {
			promises.push(saveIdleDataPackage(message.packages[key], tid))
		} else if (message.message_type == 1) {
			promises.push(saveAttitudeDataPackage(message.packages[key], tid))
		} else if (message.message_type == 2) {
			promises.push(saveFlashBurstPackage(message.packages[key], tid))
		} else if (message.message_type == 3) {
			promises.push(saveFlashComparisonPackage(messages.packages[key], tid))
		} else if (message.message_type == 4) {
			promises.push(saveLowPowerPackage(messages.packages[key], tid))
		}
	}
	return Promise.all(promises)
}

function saveErrorInfo(errors, timestamp, tid) {
	var promises = []
	for(var i = 0; i < errors.length; i++){
		promises.push(ErrorInfo.addErrorInfo({
			index: i,
			errorCode: errors[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveCurrentData(currentData, timestamp, tid) {
	return saveTimeToNextFlash(currentData.time_to_next_flash, timestamp, tid)
	.then(function() {
		return saveRebootCount(currentData.reboot_count, timestamp, tid)
	})
	.then(function() {
		return saveLionCurrents(currentData.lion_currents, tid)
	})
	.then(function() {
		return saveLionVoltages(currentData.lion_voltages, tid)
	})
	.then(function() {
		return saveLionTemperatures(currentData.lion_temperatures, tid)
	})
	.then(function() {
		return saveBatteryChargingAnalogVoltages(currentData.battery_charging_analog_voltages, timestamp, tid)
	})
	.then(function() {
		return saveBatteryChargingDigitalSignals(currentData.battery_charging_digital_signals, tid)
	})
	.then(function() {
		return saveLifepoVoltages(currentData.lifepo_voltages, timestamp, tid)
	})
	.catch(function(error) {
		throw error
	})
}

function saveTimeToNextFlash(timeToFlash, timestamp, tid) {
	return (CurrentDataTimeToFlash.addCurrentDataTimeToFlash({
		time: timeToFlash,
		timestamp: timestamp,
		tid: tid
		}))
}

function saveRebootCount(rebootCount, timestamp, tid) {
	return (CurrentDataRebootCount.addCurrentDataRebootCount({
		count: rebootCount,
		timestamp: timestamp,
		tid: tid
	}))
}

function saveLionCurrents(current, tid) {
	var promises = []
	for(var i = 0; i < current.length; i++){
		promises.push(LionCurrent.addLionCurrent({
			index: i,
			current: current[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveLionVoltages(voltage, tid) {
	var promises = []
	for(var i = 0; i < voltage.length; i++){
		promises.push(LionVoltage.addLionVoltage({
			index: i,
			voltage: voltage[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveLionTemperatures(temperature, tid) {
	var promises = []
	for(var i = 0; i < temperature.length; i++){
		promises.push(LionTemperature.addLionVoltage({
			index: i,
			temperature: temperature[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveBatteryChargingAnalogVoltages(voltages, timestamp, tid) {
	var promises = []
	for(var i = 0; i < voltages.length; i++){
		promises.push(BatteryChargingAnalogVoltage.addBatteryChargingAnalogVoltage({
			index: i,
			voltage: voltages[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveBatteryChargingDigitalSignals(signals, timestamp, tid) {
	var promises = []
	for(var i = 0; i < signals.length; i++){
		promises.push(BatteryChargingDigitalSignal.addBatteryChargingDigitalSignal({
			index: i,
			signal: signals[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveLifepoVoltages(voltages, timestamp, tid) {
	var promises = []
	for(var i = 0; i < signals.length; i++){
		promises.push(LifepoVoltage.addLifepoVoltage({
			index: i,
			voltage: voltages[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveIdleDataPackage(idleData, tid) {
	return saveEventHistory(idleData.satellite_event_history, idleData.timestamp, tid)
	.then(function() {
		return saveLionCurrents(currentData.lion_currents, tid)
	})
	.then(function() {
		return saveLionVoltages(currentData.lion_voltages, tid)
	})
	.then(function() {
		return saveLionTemperatures(currentData.lion_temperatures, tid)
	})
	.then(function() {
		return saveBatteryChargingAnalogVoltages(currentData.battery_charging_analog_voltages, idleData.timestamp, tid)
	})
	.then(function() {
		return saveBatteryChargingDigitalSignals(currentData.battery_charging_digital_signals, tid)
	})
	.then(function() {
		return saveRadioTemperature(currentData.radio_temperature, idleData.timestamp, tid)
	})
	.then(function() {
		return saveProcessorTemperature(currentData.processor_temperature, idleData.timestamp, tid)
	})
	.then(function() {
		return saveIrAmbientTemperatures(currentData.ir_ambient_temperatures, idleData.timestamp, tid)
	})
	.catch(function(error) {
		throw error
	})
}

function saveEventHistory(events, timestamp, tid) {
	var promises = []
	for(var i = 0; i < events.length; i++){
		promises.push(EventHistory.addEventHistory({
			index: i,
			event: events[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveRadioTemperature(temperature, timestamp, tid) {
	return (RadioTemperature.addRadioTemperature({
		temperature: temperature,
		timestamp: timestamp,
		tid: tid
	}))
}

function saveProcessorTemperature(temperature, timestamp, tid) {
	return (ProcessorTemperature.addProcessorTemperature({
		temperature: temperature,
		timestamp: timestamp,
		tid: tid
	}))
}

function saveIrAmbientTemperatures(temperatures, timestamp, tid) {
	var promises = []
	for(var i = 0; i < temperatures.length; i++){
		promises.push(IrAmbientTemperature.addIrAmbientTemperature({
			index: i,
			temperature: temperatures[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveAttitudeDataPackage(attitudeData, tid) {
	return saveIrObjectTemperatures(attitudeData.ir_object_temperatures, attitudeData.timestamp, tid)
	.then(function() {
		return savePhotodiode(currentData.photo_diode, attitudeData.timestamp, tid)
	})
	.then(function() {
		return saveImuAccelerometer(currentData.imu_accelerometer_1, attitudeData.timestamp, tid)
	})
	.then(function() {
		return saveImuAccelerometer(currentData.imu_accelerometer_2, attitudeData.timestamp, tid)
	})
	.then(function() {
		return saveImuGyroscope(currentData.imu_gyroscope, attitudeData.timestamp, tid)
	})
	.then(function() {
		return saveImuMagnetometer(currentData.imu_magnetometer_1, attitudeData.timestamp, tid)
	})
	.then(function() {
		return saveImuMagnetometer(currentData.imu_magnetometer_2, attitudeData.timestamp, tid)
	})
	.catch(function(error) {
		throw error
	})
}

function saveIrObjectTemperatures(temperatures, timestamp, tid) {
	var promises = []
	for(var i = 0; i < temperatures.length; i++){
		promises.push(IrObjectTemperature.addIrObjectTemperature({
			index: i,
			temperature: temperatures[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function savePhotodiode(voltages, timestamp, tid) {
	var promises = []
	for(var i = 0; i < voltages.length; i++){
		promises.push(Photodiode.addPhotodiode({
			index: i,
			voltage: voltages[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveImuAccelerometer(reading, timestamp, tid) {
	return (ImuAccelerometer.addImuAccelerometer({
		x: reading[0],
		y: reading[1],
		z: reading[2],
		timestamp: timestamp,
		tid: tid
	}))
}

function saveImuGyroscope(reading, timestamp, tid) {
	return (ImuGyroscope.addImuGyroscope({
		x: reading[0],
		y: reading[1],
		z: reading[2],
		timestamp: timestamp,
		tid: tid
	}))
}

function saveImuMagnetometer(reading, timestamp, tid) {
	return (ImuMagnetometer.addImuMagnetometer({
		x: reading[0],
		y: reading[1],
		z: reading[2],
		timestamp: timestamp,
		tid: tid
	}))
}

function saveFlashBurstPackage(flashBurst, tid) {
	return saveLedTemperatures(flashBurst.led_temperatures, flashBurst.timestamp, tid)
	.then(function() {
		return saveLifepoTemperatures(flashBurst.lifepo_battery_temperatures, flashBurst.timestamp, tid)
	})
	.then(function() {
		return saveLifepoCurrents(flashBurst.lifepo_currents, flashBurst.timestamp, tid)
	})
	.then(function() {
		return saveLifepoVoltages(flashBurst.lifepo_voltages, flashBurst.timestamp, tid)
	})
	.then(function() {
		return saveLedCurrents(flashBurst.led_currents, flashBurst.timestamp, tid)
	})
	.then(function() {
		return saveImuGyro(flashBurst.imu_gyroscope, flashBurst.timestamp, tid)
	})
	.catch(function(error) {
		throw error
	})
}

function saveLedTemperatures(temperatures, timestamp, tid) {
	var promises = []
	for(var i = 0; i < temperatures.length; i++){
		promises.push(LedTemperature.addLedTemperature({
			index: i,
			temperature: temperatures[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveLifepoTemperatures(temperatures, timestamp, tid) {
	var promises = []
	for(var i = 0; i < temperatures.length; i++){
		promises.push(LifepoTemperature.addLifepoTemperature({
			index: i,
			temperature: temperatures[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveLifepoCurrents(currents, timestamp, tid) {
	var promises = []
	for(var i = 0; i < currents.length; i++){
		promises.push(LifepoCurrent.addLifepoCurrent({
			index: i,
			current: currents[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveLifepoVoltages(voltages, timestamp, tid) {
	var promises = []
	for(var i = 0; i < voltages.length; i++){
		promises.push(LifepoVoltage.addLifepoVoltage({
			index: i,
			voltage: voltages[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveLedCurrents(currents, timestamp, tid) {
	var promises = []
	for(var i = 0; i < currents.length; i++){
		promises.push(LedCurrent.addLedCurrent({
			index: i,
			current: currents[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveLedCurrents(currents, timestamp, tid) {
	var promises = []
	for(var i = 0; i < currents.length; i++){
		promises.push(LedCurrent.addLedCurrent({
			index: i,
			current: currents[i],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveImuGyro(readings, timestamp, tid) {
	var promises = []
	for(var i = 0; i < readings.length; i+=3){
		promises.push(ImuGyroscope.addImuGyroscope({
			index: i,
			x: currents[i],
			y: currents[i+1],
			z: currents[i+2],
			timestamp: timestamp,
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveFlashComparisonPackage(flashComp, tid) {
	return saveLedTemperatures(flashComp.avg_led_temperatures, flashComp.timestamp, tid)
	.then(function() {
		return saveLifepoTemperatures(flashComp.avg_lifepo_bank_temperature, flashComp.timestamp, tid)
	})
	.then(function() {
		return saveLifepoCurrents(flashComp.avg_lifepo_currents, flashComp.timestamp, tid)
	})
	.then(function() {
		return saveLifepoVoltages(flashComp.avg_lifepo_voltages, flashComp.timestamp, tid)
	})
	.then(function() {
		return saveLedCurrents(flashComp.avg_led_currents, flashComp.timestamp, tid)
	})
	.then(function() {
		return saveImuMagnetometer(flashComp.magnetometer_before_flash, flashComp.timestamp, tid)
	})
	.catch(function(error) {
		throw error
	})
}

function saveLowPowerPackage(lowPower, tid) {
	return saveEventHistory(lowPower.satellite_event_history, lowPower.timestamp, tid)
	.then(function() {
		return saveLionVoltages(lowPower.lion_voltages, tid)
	})
	.then(function() {
		return saveLionCurrents(lowPower.lion_currents, tid)
	})
	.then(function() {
		return saveLionTemperatures(lowPower.lion_temperatures, tid)
	})
	.then(function() {
		return saveBatteryChargingAnalogVoltages(lowPower.battery_charging_analog_voltages, lowPower.timestamp, tid)
	})
	.then(function() {
		return saveBatteryChargingDigitalSignals(lowPower.battery_charging_digital_signals, lowPower.timestamp, tid)
	})
	.then(function() {
		return saveIrObjectTemperatures(lowPower.ir_object_temperatures, lowPower.timestamp, tid)
	})
	.then(function() {
		return saveImuGyroscope(lowPower.imu_gyroscope, lowPower.timestamp, tid)
	})
	.catch(function(error) {
		throw error
	})
}


module.exports = router;
