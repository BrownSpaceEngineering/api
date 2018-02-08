var Chance = require('chance'); // import constructor
var generateFloatArray = require('./util/chanceArrays');

var chance = new Chance(); // create instance of chance object



function generateAttitudeData() {
  var data = []
  for (var i=0; i<5; i++) {
    data.push({
      "ir_temperature": generateFloatArray(6),
      "photo_diode": generateFloatArray(6),
      "imu_accelerometer": [ generateFloatArray(3), generateFloatArray(3) ],
      "imu_gyroscope": [ generateFloatArray(3) ],
      "imu_magnetometer": [ generateFloatArray(3), generateFloatArray(3) ],
      "timestamp": chance.integer({min: 0, max: 100})
    })
  }
  return data;
}

module.exports = generateAttitudeData;
