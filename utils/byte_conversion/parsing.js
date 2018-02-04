var Parser = require('binary-parser').Parser;

var Conversions = require('./conversions.js');

// formatter for errors, takes in the array of uint8s
function error_formatter(arr){
    return arr;
}

function to_float(){
    return (elt) => {return elt;};
}

function to_float_arr(){
    return (arr) => {return arr;};
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
          formatter: to_bool_arr_cutoff(14)
      })
      .uint8('radio_temperature', {
          formatter: to_float()
      })
      .uint8('processor_temperature', {
          formatter: to_float()
      })
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

const flashBurstParser = new Parser()
      .endianess('little')
      .array('led_temperatures', {
          type: "uint8",
          length: 28,
          formatter: function(arr){
              return partition_array(make_formatter(repeat_array(Conversions.led_temperatures, 7), 8)(arr), 7);
          }
      })
      .array('lifepo_battery_temperatures', {
          type: "uint8",
          length: 14,
          formatter: function(arr){
              return partition_array(make_formatter(repeat_array(Conversions.lifepo_battery_temperatures, 7), 8)(arr), 7);
          }
      })
      .array('lifepo_currents', {
          type: "uint8",
          length: 28,
          formatter: function(arr){
              return partition_array(make_formatter(repeat_array(Conversions.lifepo_currents, 7), 8)(arr), 7);
          }
      })
      .array('lifepo_voltages', {
          type: "uint8",
          length: 28,
          formatter: function(arr){
              return partition_array(make_formatter(repeat_array(Conversions.lifepo_voltages, 7), 8)(arr), 7);
          }
      })
      .array('led_currents', {
          type: "uint8",
          length: 28,
          formatter: function(arr){
              return partition_array(make_formatter(repeat_array(Conversions.led_currents, 7), 8)(arr), 7);
          }
      })
      .array('imu_gyroscope', {
          type: 'uint8',
          length: 21,
          formatter: function(arr){
              return partition_array(make_formatter(repeat_array(Conversions.imu_gyroscope, 7), 8)(arr), 7);
          }
      })
      .uint32le('timestamp');

// making this for consistency's sake but not strictly necessary
const fullFlashBurstParser = new Parser()
      .nest('one', {
          type: flashBurstParser
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
          formatter: to_bool_arr_cutoff(14)
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
          formatter: to_bool_arr_cutoff(14)
      })
      .array('lifepo_voltages', {
          type: 'uint8',
          length: 4,
          formatter: make_formatter(Conversions.lifepo_voltages, 8)
      });

const preambleParser = new Parser()
      .endianess('little')
      .string('callsign', {
          length : 4,
          encoding : 'ascii'
      })
      .uint32le('timestamp')
      .bit3('message_type')
      .bit3('satellite_state')
      .bit2('padding') // this parser library does have a skip function but it only works in byte intervals so we have to do this.
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


idleBuf = Buffer("4b3141440000000010a10b3c0924c801000000070700000505060577c62f269888f5b430349d3a0d0fbd2fa1f70fd968f4d977c62f269888f5b430349d3a0d0fbd2fa1f70fd968f4d977c62f269888f5b430349d3a0d0fbd2fa1f70fd968f4d977c62f269888f5b430349d3a0d0fbd2fa1f70fd968f4d977c62f269888f5b430349d3a0d0fbd2fa1f70fd968f4d977c62f269888f5b430349d3a0d0fbd2fa1f70fd968f4d977c62f269888f5b430349d3a0d0fbd2fa1f70fd968f4d90133000137000129000133000137000134000135000135000135000135000136000000df26974f474694fe6cdc46d1fad9d00468b35a978e662fb9c2c94b72864822eb", "hex");

attitudeBuf = Buffer("4b3141440000000011a50a3c0909540100000007070000050605052f26bedeecbf38adb0dfa30d29c86fdf7806b8840a72a22a4cae77c78ac51fc71883ab27735c9418d7491f308121cd0dd94671b19a722a25118c811ad42dac767281827f56637b60a7aa7face1f0e4384d663a1eb750aa6738e0eeb6668c4764c30cea8994ea53bdff44dca520d5a34c8e9493a12474cd1a04a37f41ff124f42f6f954b38436e0bbbf9785a20ac15a481cc9c58969d2aa32cf71c8d71451a2068dc9fac91801350001350001360001360001360001360001290001340001350001350000751ffe5beb4c6158925a8f85880103571f892b3750569ec9e2ac5c22701929","hex");

flashBurstBuf = Buffer("4b3141440000000012970f3c091e960100000007070000050505053c6e4bd24e6d0f48cb56a494c251f998eeddd12e85dd1386aa3a8361c7679f542d3174b748c7aa250131b7e55497345c8565b7ff8404ea855aeef6695844f38e2c2c4e195388facffad0698f49e47e18c518ada0f78b05cc466dbdea156abfc01b4863a084e8bf5c88187ef43f64cc47bc8a3c5933b875882c67c75e2ad2e4ed8cfd31dd642ca82e60b035be8fbd69073a322846a1374e0134000135000135000135000135000136000136000000000106000105000104000103000102000101000000004920b2922b43e479a12b374b53fe7279bf4774af033d9471f4f496d7d7bcfd","hex");

flashComparisonBuf = Buffer("4b3141440000000013960f3c09c3770100000005070000050505050000000000000000000000009edd0000000092f5e58c98f4b5f2cb371f1613bb1415a351236aa8e85c6f7cc98bdcd0c31d5fdac11b3bee5a129c8f49d5ea208e663ce082fd3509f6e6fdb3f67f1239d935e2a9dd1fb13bb03746777e75b2dcdb04cb770dc5f202dce9f3eb58c104f5df0a5c22eb2ce0d433e739e4b09ddb1f2ab8dfbcfafc5c600c9318b8e18afc6746fd834683d3eb0105000104000103000102000101000000000000000000000000000000000000000000000133ff0137ff0133ff0077190680db2f8548fb5db69387f3a9a29c3b99741777450e9832a563f1aacc","hex");

lowPowerBuf = Buffer("4b3141440000000010960f3c090f2b010000000707000005050505d4d6fb29b965c8dccd9f3f94babc33751bf3e200edc3af7fefdb28d0a2ebd4d6fb29b965c8dccd9f3f94babc33751bf3e200edc3af7fefdb28d0a2ebd4d6fb29b965c8dccd9f3f94babc33751bf3e200edc3af7fefdb28d0a2ebd4d6fb29b965c8dccd9f3f94babc33751bf3e200edc3af7fefdb28d0a2ebd4d6fb29b965c8dccd9f3f94babc33751bf3e200edc3af7fefdb28d0a2eb0133ff0137ff0133ff0137ff0134ff0135ff0135ff0135ff0135ff0136ff0136ff0136ff0136ff0129000133000082c2c01ab1b0d7e3a6b5a16aedfb24254d4e40d214bedbf67ce5e568c1b50b","hex");

//console.log(preambleParser.parse(idleBuf));
// console.log(preambleParser.parse(attitudeBuf));
console.log(preambleParser.parse(flashBurstBuf));
