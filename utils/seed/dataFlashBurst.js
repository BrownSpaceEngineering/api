var Chance = require('chance'); // import constructor
var chance = new Chance();
var generateFloatArray = require('./util/chanceArrays');



function generateLifepoBatteryTemperature() {
  var data = [];
  for (var i=0; i<7; i++) {
    data.push([chance.integer(), chance.integer()]);
  }
  return data;
}

function generateImuGyroscope() {
  var data = [];
  for (var i=0; i<7; i++) {
    data.push([chance.integer(), chance.integer(), chance.integer()]);
  }
  return data;
}

function generateComparisons() {
  var data = []
  for (var i=0; i<6; i++) {
    data.push({
      "led_temperature": generateFloatArray(4),
      "led_current": generateFloatArray(4),
      "lifepo_battery_temperature": [ chance.integer(), chance.integer() ],
      "lifepo_current": generateFloatArray(4),
      "lifepo_voltage": generateFloatArray(4),
      "imu_magnetometer": [ chance.integer(), chance.integer(), chance.integer() ],
      "timestamp": chance.integer({min: 0, max: 100})
    })
  }
  return data;
}

function generateSevenByFour() {
  var data=[]
  for (var i=0; i<7; i++) {
    data.push(generateFloatArray(4))
  }
  return data;
}

function generateFlashBurstData() {
  return {
    "led_temperature": generateSevenByFour(),
    "lifepo_battery_temperature": generateLifepoBatteryTemperature(),
    "lifepo_current": generateSevenByFour(),
    "lifepo_voltage": generateSevenByFour(),
    "led_current": generateSevenByFour(),
    "imu_gyroscope": generateImuGyroscope(),
    "data_flash_comparison": generateComparisons(),
    "timestamp": chance.integer({min: 0, max: 100})
  };
}

module.exports = generateFlashBurstData;
