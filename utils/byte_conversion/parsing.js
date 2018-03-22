var Parser = require('binary-parser').Parser;

var Conversions = require('./conversions.js');


// call this function with raw as a hex buffer and it'll give you a json!
function parse(buf) {
    return preambleParser.parse(buf);
}


// formatter for errors, takes in the array of uint8s
function error_formatter(arr){
    return arr;
}

// takes in an array and a number of reps and produces an array
// that is the equivalent of arr being repeated reps times
function repeat_array(arr, reps){
    ans = [];
    len = arr.length;
    for(i = 0; i < reps * len; i ++){
        ans.push(arr[i%len]);
    }
    return ans;
}

// takes in an array and a chunksize and produces an array of arrays
// where the inner arrays are of size chunksize and contain the elements
// of arr in order.
function partition_array(arr, chunksize){
    len = arr.length;
    ans = [];
    tmp = [];
    for(i = 0; i < len; i ++){
        if(i !== 0 && i % chunksize === 0){
            ans.push(tmp.slice(0));
            tmp = [];
        }
        tmp.push(arr[i]);
    }
    if(tmp.length !== 0){
        ans.push(tmp);
    }
    return ans;
}

// takes in an array of items and produces the stringified version
// of that array.
function arrString(arr){
    ans = "[";
    for(i = 0; i < arr.length; i ++){
        func = arr[i];
        ans += func.toString();
        ans += ",";
    }
    // trim trailing comma
    ans = ans.substring(0, ans.length - 1);
    ans += "]";
    return ans;
}

// takes in an array of functions and the number of bits to
// left shift by. returns a function that takes in an array,
// and transforms it by applying the corresponding function
// and left shift to each element.
function make_formatter(funcs, lshift){
    return new Function("arr",
                        "s = arr.length;" +
                        "ans = [];" +
                        "f=" + arrString(funcs) + ";" +
                        "for(i = 0; i < s; i ++){ans.push(f[i](arr[i]<<" + lshift +  "));}" +
                        "return ans;");
}

/*
 Notes:
 Keys cannot contain spaces.
 If you are using uint, must specify le or be if it isn't a uint8.
 */

// formatter to turn unsigned ints into boolean arrays
function to_bool_arr(){
    return new Function("arg", "return arg.toString(2).split('').map(elt => elt === '1');");
}

// same as to_bool_arr, but cuts off the array produced at the cutoff'th entry. [0, cutoff)
function to_bool_arr_cutoff(cutoff){
    return new Function("arg", "c = " + cutoff, "return arg.toString(2).split('').map(elt => elt === '1').slice(0, c);");
}

// function to turn unsigned ints into integer arrays (based on 2 bit representations of integers).
function to_int_arr_cutoff(cutoff){
    return new Function("arg", "bits = arg.toString(2).split('').map(elt => parseInt(elt));" +
                        "ans = [];" +
                        "prev = 0;" +
                        "for(i = 0; i < bits.length; i ++){" +
                            "elt = bits[i];" +
                            "if(i%2 === 0){" +
                                "prev = elt;" +
                            "} else {" +
                                "val = prev + 2 * elt;" +
                                "ans.push(val);" +
                                "prev = 0;" +
                            "}" +
                        "}" +
                        "return ans.slice(0," + cutoff + ");");
}

(arg, cutoff) => {
    bits = arg.toString(2).split('').map(elt => parseInt(elt));
    ans = [];
    prev = 0;
    for(i = 0; i < bits.length; i ++){
        elt = bits[i];
        if(i%2 === 0){
            prev = elt;
        } else {
            val = prev + 2 * elt;
            ans.push(val);
            prev = 0;
        }
    }
    return ans.slice(0, cutoff);
};


// stuff is little endian

const dataIdleParser = new Parser()
      .endianess('little')
      .uint8('satellite_event_history', {
          formatter: to_bool_arr_cutoff(6)
      })
      .array('lion_voltages', {
          type: "uint8",
          length: 2,
          formatter: make_formatter(Conversions.lion_voltages, 8)
      })
      .array('lion_currents', {
          type: "uint8",
          length: 2,
          formatter: make_formatter(Conversions.lion_currents, 8)
      })
      .array('lion_temperatures', {
          type: "uint8",
          length: 2,
          formatter: make_formatter(Conversions.lion_temperatures, 8)
      })
      .array('battery_charging_analog_voltages', {
          type: "uint8",
          length: 2,
          formatter: make_formatter(Conversions.battery_charging_analog_voltages, 8)
      })
      .uint16le('battery_charging_digital_signals', {
          formatter: to_bool_arr_cutoff(16)
      })
      .uint8('radio_temperature')
      .uint8('processor_temperature')
      .array('ir_ambient_temperatures', {
          type: 'uint8',
          length: 6,
          formatter: make_formatter(Conversions.ir_ambient_temperatures, 8)
      })
      .uint32le('timestamp');

const fullDataIdleParser = new Parser()
      .nest('one', {
          type: dataIdleParser
      })
      .nest('two', {
          type: dataIdleParser
      })
      .nest('three', {
          type: dataIdleParser
      })
      .nest('four', {
          type: dataIdleParser
      })
      .nest('five', {
          type: dataIdleParser
      })
      .nest('six', {
          type: dataIdleParser
      })
      .nest('seven', {
          type: dataIdleParser
      });

const dataAttitudeParser = new Parser()
      .endianess('little')
      .array('ir_object_temperatures', {
          type: 'uint16le',
          length: 6,
          formatter: make_formatter(Conversions.ir_object_temperatures, 0)
      })
      .uint16le('photo_diode', {
          formatter: to_bool_arr_cutoff(12)
      })
      .array('imu_accelerometer_1', {
          type: 'uint8',
          length: 3,
          formatter: make_formatter(Conversions.imu_accelerometer, 8)
      })
      .array('imu_accelerometer_2', {
          type: 'uint8',
          length: 3,
          formatter: make_formatter(Conversions.imu_accelerometer, 8)
      })
     .array('imu_gyroscope', {
          type: 'uint8',
          length: 3,
          formatter: make_formatter(Conversions.imu_gyroscope, 8)
      })
      .array('imu_magnetometer_1', {
          type: 'uint8',
          length: 3,
          formatter: make_formatter(Conversions.imu_magnetometer, 8)
      })
      .array('imu_magnetometer_2', {
          type: 'uint8',
          length: 3,
          formatter: make_formatter(Conversions.imu_magnetometer, 8)
      })
      .uint32le('timestamp');

const fullDataAttitudeParser = new Parser()
      .nest('one', {
          type: dataAttitudeParser
      })
      .nest('two', {
          type: dataAttitudeParser
      })
      .nest('three', {
          type: dataAttitudeParser
      })
      .nest('four', {
          type: dataAttitudeParser
      })
      .nest('five', {
          type: dataAttitudeParser
      });

const newFlashBurstParser = new Parser()
      .endianess('little')
      .array('led_temperatures', {
          type: "uint8",
          length: 28
      })
      .array('lifepo_battery_temperatures', {
          type: "uint8",
          length: 14
      })
      .array('lifepo_currents', {
          type: "uint8",
          length: 28
      })
      .array('lifepo_voltages', {
          type: "uint8",
          length: 28
      })
      .array('led_currents', {
          type: "uint8",
          length: 28
      })
      .array('imu_gyroscope', {
          type: 'uint8',
          length: 21
      })
      .uint32le('timestamp');



// const flashBurstParser = new Parser()
//       .endianess('little')
//       .array('led_temperatures', {
//           type: "uint8",
//           length: 28,
//           formatter: function(arr){
//               return partition_array(make_formatter(repeat_array(Conversions.led_temperatures, 7), 8)(arr), 7);
//           }
//       })
//       .array('lifepo_battery_temperatures', {
//           type: "uint8",
//           length: 14,
//           formatter: function(arr){
//               return partition_array(make_formatter(repeat_array(Conversions.lifepo_battery_temperatures, 7), 8)(arr), 7);
//           }
//       })
//       .array('lifepo_currents', {
//           type: "uint8",
//           length: 28,
//           formatter: function(arr) {
//               return partition_array(make_formatter(repeat_array(Conversions.lifepo_currents, 7), 8)(arr), 7);
//           }
//       })
//       .array('lifepo_voltages', {
//           type: "uint8",
//           length: 28,
//           formatter: function(arr){
//               return partition_array(make_formatter(repeat_array(Conversions.lifepo_voltages, 7), 8)(arr), 7);
//           }
//       })
//       .array('led_currents', {
//           type: "uint8",
//           length: 28,
//           formatter: function(arr){
//               return partition_array(make_formatter(repeat_array(Conversions.led_currents, 7), 8)(arr), 7);
//           }
//       })
//       .array('imu_gyroscope', {
//           type: 'uint8',
//           length: 21,
//           formatter: function(arr){
//               return partition_array(make_formatter(repeat_array(Conversions.imu_gyroscope, 7), 8)(arr), 7);
//           }
//       })
//       .uint32le('timestamp');

// making this for consistency's sake but not strictly necessary
const fullFlashBurstParser = new Parser()
      .nest('one', {
          type: newFlashBurstParser
      });

const flashComparisonParser = new Parser()
      .endianess('little')
      .array('avg_led_temperatures', {
          type: "uint8",
          length: 4,
          formatter: make_formatter(Conversions.led_temperatures, 0)
      })
      .array('avg_lifepo_bank_temperature', {
          type: "uint8",
          length: 2,
          formatter: make_formatter(Conversions.lifepo_battery_temperatures, 0)
      })
      .array('avg_lifepo_currents', {
          type: "uint8",
          length: 4,
          formatter: make_formatter(Conversions.lifepo_currents, 0)
      })
      .array('avg_lifepo_voltages', {
          type: "uint8",
          length: 4,
          formatter: make_formatter(Conversions.lifepo_voltages, 0)
      })
      .array('avg_led_currents', {
          type: "uint8",
          length: 4,
          formatter: make_formatter(Conversions.led_currents, 0)
      })
      .array('magnetometer_before_flash', {
          type: "uint8",
          length: 3,
          formatter: make_formatter(Conversions.imu_magnetometer, 8)
      })
      .uint32le('timestamp');

const fullFlashComparisonParser = new Parser()
      .nest('one', {
          type: flashComparisonParser
      })
      .nest('two', {
          type: flashComparisonParser
      })
      .nest('three', {
          type: flashComparisonParser
      })
      .nest('four', {
          type: flashComparisonParser
      })
      .nest('five', {
          type: flashComparisonParser
      })
      .nest('six', {
          type: flashComparisonParser
      });

const lowPowerParser = new Parser()
      .endianess('little')
      .uint8('satellite_event_history', {
          formatter: to_bool_arr_cutoff(6)
      })
      .array('lion_voltages', {
          type: "uint8",
          length: 2,
          formatter: make_formatter(Conversions.lion_voltages, 8)
      })
      .array('lion_currents', {
          type: "uint8",
          length: 2,
          formatter: make_formatter(Conversions.lion_currents, 8)
      })
      .array('lion_temperatures', {
          type: "uint8",
          length: 2,
          formatter: make_formatter(Conversions.lion_temperatures, 8)
      })
      .array('battery_charging_analog_voltages', {
          type: "uint8",
          length: 2,
          formatter: make_formatter(Conversions.battery_charging_analog_voltages, 8)
      })
      .uint16le('battery_charging_digital_signals', {
          formatter: to_bool_arr_cutoff(16)
      })
      .array('ir_object_temperatures', {
          type: 'uint16le',
          length: 6,
          formatter: make_formatter(Conversions.ir_object_temperatures, 0)
      })
      .array('imu_gyroscope', {
          type: 'uint8',
          length: 3,
          formatter: make_formatter(Conversions.imu_gyroscope, 8)
      })
      .uint32le('timestamp');

const fullLowPowerParser = new Parser()
      .nest('one', {
          type: lowPowerParser
      })
      .nest('two', {
          type: lowPowerParser
      })
      .nest('three', {
          type: lowPowerParser
      })
      .nest('four', {
          type: lowPowerParser
      })
      .nest('five', {
          type: lowPowerParser
      });

const currentDataParser = new Parser()
      .endianess('little')
      .uint8('time_to_next_flash')
      .uint8('reboot_count')
      .array('lion_voltages', {
          type: 'uint8',
          length: 2,
          formatter: make_formatter(Conversions.lion_voltages, 8)
      })
      .array('lion_currents', {
          type: 'uint8',
          length: 2,
          formatter: make_formatter(Conversions.lion_currents, 8)
      })
      .array('lion_temperatures', {
          type: 'uint8',
          length: 2,
          formatter: make_formatter(Conversions.lion_temperatures, 8)
      })
      .array('battery_charging_analog_voltages', {
          type: 'uint8',
          length: 2,
          formatter: make_formatter(Conversions.battery_charging_analog_voltages, 8)
      })
      .uint16le('battery_charging_digital_signals', {
          formatter: to_bool_arr_cutoff(16)
      })
      .array('lifepo_voltages', {
          type: 'uint8',
          length: 4,
          formatter: make_formatter(Conversions.lifepo_voltages, 8)
      });

const preambleParser = new Parser()
      .endianess('little')
      .string('callsign', {
          length : 6,
          encoding : 'ascii'
      })
      .uint32le('timestamp')
      .bit3('message_type')
      .bit3('satellite_state')
      .bit1('spf_st')
      .bit1('mram_cpy')
      .uint8('bytes_of_data')
      .uint8('num_errors')
      .nest('current_data', {
          type: currentDataParser
      })
      .choice('packages', {
          tag: 'message_type',
          choices: {
              0: fullDataIdleParser,
              1: fullDataAttitudeParser,
              2: fullFlashBurstParser,
              3: fullFlashComparisonParser,
              4: fullLowPowerParser
          }
      })
      .array('errors', {
          type: 'uint8',
          length: function(){return this.num_errors * 3;},
          formatter: error_formatter
      })
      .array('padding_2', {
          type: 'uint8',
          lengthInBytes: function(){ return 255 - this.bytes_of_data - 3 * this.num_errors - 32;}
      })
      // .skip(255 - this.bytes_of_data - 3 * this.num_errors - 32) // this really should work but it doesn't. Using array solution instead but it's not ideal
      .buffer('reed_solomon', {
          clone: true,
          length: 32
      });

buf = new Buffer("574c39585a450300000029a5090c010206030303030606f0f1020101010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009c31009b30009b2f00a034009c32009c31009b30009b2f00a034000000afce6a6441b8c45b5e7fb9046d348da143078c9207fddd8a15ca1520998b6e76", "hex");

buf2 = new Buffer("574c39585a450300000028a10b0c010206030303030606f0f10201010100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009c32009c31009b30009b2f00a034009c32009c31009b30009b2f00a034009c3200f1ac87b7bd3b43b9032c22d779428351cdc15f4e7ce37ca7443781dbc53db7d4", "hex");

console.log(parse(buf));
console.log(parse(buf2));
