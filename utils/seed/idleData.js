var Chance = require('chance'); // import constructor
var chance = new Chance(); // create instance of chance object

function generateSatelliteEventHistory() {
  var data = []
  for (var i = 0; i < 5; i++) {
    data.push(chance.integer({min: 0, max: 1}))
  }
  return data
}

function generateLionVoltages() {
  return [chance.floating(), chance.floating()]
}

function generateLionCurrents() {
  return [chance.floating(), chance.floating()]
}

function generateLionTemperature() {
  return [chance.integer(), chance.integer()]
}

function generateBatteryChargingAnalogVoltages() {
  return [chance.floating(), chance.floating()]
}

function generateBatteryChargingDigitalSignals() {
  var data = []
  for (var i = 0; i < 16; i++) {
    data.push(chance.integer({min: 0, max: 1}))
  }
  return data
}

function generateIrAmbientTemperature() {
  var data = []
  for (var i = 0; i < 6; i++) {
    data.push(chance.integer({min: 0, max: 1}))
  }
  return data
}


function generateIdleData() {
  var data = []
  for (var i=0; i<6; i++) {
    data.push({
      "satellite_event_history": generateSatelliteEventHistory(),
      "lion_voltages": generateLionVoltages(),
      "lion_currents": generateLionCurrents(),
      "lion_temperature": generateLionTemperature(),
      "battery_charging_analog_voltages": generateBatteryChargingAnalogVoltages(),
      "battery_charging_digital_signals": generateBatteryChargingDigitalSignals(),
      "ir_ambient_temperature": generateIrAmbientTemperature(),
      "processor_temperature": chance.integer(),
      "radio_temperature": chance.floating(),
      "radio_current": chance.floating(),
      "timestamp": chance.integer()
    })
  }
  return data
}

module.exports = generateIdleData;
