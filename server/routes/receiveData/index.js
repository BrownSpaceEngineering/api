var router = require('express').Router();

var Preamble = require('./../common/preamble.js');
var Raw = require('./../common/raw.js');
var ErrorInfo = require('./../common/errorInfo.js');

//currentData
var CurrBatteryChargingAnalogVoltage = require('./../common/currentData/currBatteryChargingAnalogVoltage.js')
var CurrBatteryChargingDigitalSignal = require('./../common/currentData/currBatteryChargingDigitalSignal.js')
var CurrDigitalOutput = require('./../common/currentData/currDigitalOutput.js')
var CurrLionCurrent = require('./../common/currentData/currLionCurrent.js')
var CurrLionVoltage = require('./../common/currentData/currLionVoltage.js')

//dataAttitude
var AttitudeImuAccelerometer = require('./../common/dataAttitude/attitudeImuAccelerometer.js')
var AttitudeImuGyroscope = require('./../common/dataAttitude/attitudeImuGyroscope.js')
var AttitudeImuMagnetometer = require('./../common/dataAttitude/attitudeImuMagnetometer.js')
var AttitudeIrTemperature = require('./../common/dataAttitude/attitudeIrTemperature.js')
var AttitudePhotoDiode = require('./../common/dataAttitude/attitudePhotoDiode.js')

//dataFlashBurst
var FlashBurstLifepoCurrent = require('./../common/dataFlashBurst/flashBurstLifepoCurrent.js')
var FlashBurstLifepoVoltage = require('./../common/dataFlashBurst/flashBurstLifepoVoltage.js')
var FlashBurstTemperature = require('./../common/dataFlashBurst/flashBurstTemperature.js')

//dataFlashComparison
var FlashCompLedCurrent = require('./../common/dataFlashComparison/flashCompLedCurrent.js')
var FlashCompLedTemperature = require('./../common/dataFlashComparison/flashCompLedTemperature.js')
var FlashCompLifepoCurrent = require('./../common/dataFlashComparison/flashCompLifepoCurrent.js')
var FlashCompLifepoVoltage = require('./../common/dataFlashComparison/flashCompLifepoVoltage.js')

//idleData
var Idle33VRailVoltage = require('./../common/idleData/idle33VRailVoltage.js')
var Idle5VRailVoltage = require('./../common/idleData/idle5VRailVoltage.js')
var IdleBatteryTemperature = require('./../common/idleData/idleBatteryTemperature.js')
var IdleImuTemperature = require('./../common/idleData/idleImuTemperature.js')
var IdleIrAmbientTemperature = require('./../common/idleData/idleIrAmbientTemperature.js')
var IdleRadioTemperature = require('./../common/idleData/idleRadioTemperature.js')
var IdleRadioVoltage = require('./../common/idleData/idleRadioVoltage.js')



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
		return saveDataFlashComparison(rawJSON.data_flash_comparison, tid)
	})
	.then(function() {
		return saveDataIdle(rawJSON.data_idle, tid)
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
		return saveCurrLionCurrent(currentData.lion_currents, tid)
	})
	.then(function() {
		return saveCurrLionVoltage(currentData.lion_voltages, tid)
	})
	.then(function() {
		return saveCurrDigitalOutput(currentData.digital_output, tid)
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

function saveCurrDigitalOutput(digitalOutput, tid) {
	return (CurrDigitalOutput.addCurrDigitalOutput({
		index: 0, //NOTE: WHAT IS THIS INDEX FOR?
		output: digitalOutput,
		tid: tid
	}))
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
		return saveAttitudeIrTemperature(attitude.ir_temperature, tid, attitude.timestamp)
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

function saveAttitudeIrTemperature(temperature, tid, timestamp) {
	var promises = []
	for(var i = 0; i < temperature.length; i++){
		promises.push(AttitudeIrTemperature.addAttitudeIrTemperature({
			index: i, 
			temperature: temperature[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
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

function saveDataFlashComparison(comparison, tid) {
	return saveFlashCompLedCurrent(comparison.led_current, tid, comparison.timestamp)
	.then(function() {
		return saveFlashCompLedTemperature(comparison.temperature, tid, comparison.timestamp)
	})
	.then(function() {
		return saveFlashCompLifepoCurrent(comparison.lifepo_current, tid, comparison.timestamp)
	})
	.then(function() {
		return saveFlashCompLifepoVoltage(comparison.lifepo_voltage, tid, comparison.timestamp)
	})
	.catch(function(error) {
		throw error
	})
}

function saveFlashCompLedCurrent(current, tid, timestamp) {
	var promises = []
	for(var i = 0; i < current.length; i++){
		promises.push(FlashCompLedCurrent.addFlashCompLedCurrent({
			index: i, 
			current: current[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveFlashCompLedTemperature(temperature, tid, timestamp) {
	var promises = []
	for(var i = 0; i < temperature.length; i++){
		promises.push(FlashCompLedTemperature.addFlashCompLedTemperature({
			index: i, 
			temperature: temperature[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveFlashCompLifepoCurrent(current, tid, timestamp) {
	var promises = []
	for(var i = 0; i < current.length; i++){
		promises.push(FlashCompLifepoCurrent.addFlashCompLifepoCurrent({
			index: i, 
			current: current[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveFlashCompLifepoVoltage(voltage, tid, timestamp) {
	var promises = []
	for(var i = 0; i < voltage.length; i++){
		promises.push(FlashCompLifepoVoltage.addFlashCompLifepoVoltage({
			index: i, 
			voltage: voltage[i],
			tid: tid,
			timestamp: timestamp
		}))
	}
	return Promise.all(promises)
}

function saveDataIdle(idle, tid) {
	return saveIdle33VRailVoltage(idle.three_v_rail_voltage, tid)
	.then(function() {
		return saveIdle5VRailVoltage(idle.five_v_rail_voltage, tid)
	})
	.then(function() {
		return saveIdleBatteryTemperature(idle.battery_temperature, tid)
	})
	.then(function() {
		return saveIdleImuTemperature(idle.imu_temperature, tid)
	})
	.then(function() {
		return saveIdleIrAmbientTemperature(idle.ir_ambient_temperature, tid)
	})
	.then(function() {
		return saveIdleRadioTemperature(idle.radio_temperature, tid)
	})
	.then(function() {
		return saveIdleRadioVoltage(idle.radio_voltage, tid)
	})
	.catch(function(error) {
		throw error
	})
}

function saveIdle33VRailVoltage(voltage, tid) {
	return Idle33VRailVoltage.addIdle33VRailVoltage({
		voltage: voltage,
		tid: tid
	})
}

function saveIdle5VRailVoltage(voltage, tid) {
	return Idle5VRailVoltage.addIdle5VRailVoltage({
		voltage: voltage,
		tid: tid
	})
}

function saveIdleBatteryTemperature(temperature, tid) {
	var promises = []
	for(var i = 0; i < temperature.length; i++){
		promises.push(IdleBatteryTemperature.addIdleBatteryTemperature({
			index: i, 
			temperature: temperature[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveIdleImuTemperature(temperature, tid) {
	return IdleImuTemperature.addIdleImuTemperature({
		temperature: temperature,
		tid: tid
	})
}

function saveIdleIrAmbientTemperature(temperature, tid) {
	var promises = []
	for(var i = 0; i < temperature.length; i++){
		promises.push(IdleIrAmbientTemperature.addIdleIrAmbientTemperature({
			index: i, 
			temperature: temperature[i],
			tid: tid
		}))
	}
	return Promise.all(promises)
}

function saveIdleRadioTemperature(temperature, tid) {
	return IdleRadioTemperature.addIdleRadioTemperature({
		temperature: temperature,
		tid: tid
	})
}

function saveIdleRadioVoltage(voltage, tid) {
	return IdleRadioVoltage.addIdleRadioVoltage({
		voltage: voltage,
		tid: tid
	})
}


module.exports = router;
