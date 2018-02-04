var exports = {};
exports.lifepo_currents = [];
exports.lifepo_voltages = [];
exports.lion_voltages = [];
exports.lion_temperatures = [];
exports.lion_currents = [];
exports.battery_charging_analog_voltages = [];
exports.led_currents = [];
exports.led_temperatures = [];
exports.lifepo_battery_temperatures = [];
exports.ir_object_temperatures = [];
exports.ir_ambient_temperatures = [];
exports.imu_accelerometer = [];
exports.imu_magnetometer = [];
exports.imu_gyroscope = [];

LFB1OSNS = function(raw){
    return raw * 71.43;
};

LFB1SNS = function(raw){
    return raw - 0.980 * 50;
};

LFB2OSNS = function(raw){
    return raw * 71.43;
};

LFB2SNS = function(raw){
    return raw - 0.979 * 50;
};

exports.lifepo_currents.push(LFB1OSNS, LFB1SNS, LFB2OSNS, LFB2SNS);

LF2REF = function(raw){
    return raw * 1.95;
};

// final value still needs to have LF2REF subtracted from it
LF1REF = function(raw){
    return raw * 3.87;
};

LF4REF = function(raw){
    return raw * 1.95;
};

// final value still needs to have LF4REF subtracted from it
LF3REF = function(raw){
    return raw * 3.87;
};

exports.lifepo_voltages.push(LF1REF, LF2REF, LF3REF, LF4REF);

L1_REF = function(raw){
    return raw * 2.5;
};

L2_REF = function(raw){
    return raw * 2.5;
};

exports.lion_voltages.push(L1_REF, L2_REF);

L1_SNS = function(raw){
    return (raw/4096 * 3.3 - 0.985) * 2000;
};

L2_SNS = function(raw){
    return (raw/4096 * 3.3 - 1.022) * 2000;
};

exports.lion_currents.push(L1_SNS, L2_SNS);

L_REF = function(raw){
    return (raw/4096 * 3.3 - 0.05) * 2717;
};

PANELREF = function(raw){
    return (raw/4096 * 3.3 - 0.13) * 5580;
};

exports.battery_charging_analog_voltages.push(L_REF, PANELREF);

LED1SNS = function(raw){
    return raw/0.03;
};

LED2SNS = function(raw){
    return raw/0.03;
};

LED3SNS = function(raw){
    return raw/0.03;
};

LED4SNS = function(raw){
    return raw/0.03;
};

exports.led_currents.push(LED1SNS, LED2SNS, LED3SNS, LED4SNS);

LF3_TEMP = function(raw){
    return raw/2197 - 0.0003551 * 1000000 - 273;
};

LF1_TEMP = function(raw){
    return raw/2197 - 0.0003551 * 1000000 - 273;
};

exports.lifepo_battery_temperatures.push(LF1_TEMP, LF3_TEMP);

L2_TEMP = function(raw){
    return raw/2197 - 0.0003551 * 1000000 - 273;
};

L1_TEMP = function(raw){
    return raw/2197 - 0.0003551 * 1000000 - 273;
};

exports.lion_temperatures.push(L1_TEMP, L2_TEMP);

LED4TEMP = function(raw){
    return raw/2197 - 0.0003551 * 1000000 - 273;
};

LED3TEMP = function(raw){
    return raw/2197 - 0.0003551 * 1000000 - 273;
};

LED2TEMP = function(raw){
    return raw/2197 - 0.0003551 * 1000000 - 273;
};

LED1TEMP = function(raw){
    return raw/2197 - 0.0003551 * 1000000 - 273;
};

exports.led_temperatures.push(LED1TEMP, LED2TEMP, LED3TEMP, LED4TEMP);


IR_FLASH_OBJ = function(raw){
    return raw * 0.2 - 273.15;
};

IR_SIDE1_OBJ = function(raw){
    return raw * 0.2 - 273.15;
};

IR_SIDE2_OBJ = function(raw){
    return raw * 0.2 - 273.15;
};

IR_RBF_OBJ = function(raw){
    return raw * 0.2 - 273.15;
};

IR_ACCESS_OBJ = function(raw){
    return raw * 0.2 - 273.15;
};

IR_TOP1_OBJ = function(raw){
    return raw * 0.2 - 273.15;
};

exports.ir_object_temperatures.push(IR_FLASH_OBJ, IR_SIDE1_OBJ, IR_SIDE2_OBJ, IR_RBF_OBJ, IR_ACCESS_OBJ, IR_TOP1_OBJ);

IR_FLASH_AMB = function(raw){
    return raw * 0.2 - 273.15;
};

IR_SIDE1_AMB = function(raw){
    return raw * 0.2 - 273.15;
};

IR_SIDE2_AMB = function(raw){
    return raw * 0.2 - 273.15;
};

IR_RBF_AMB = function(raw){
    return raw * 0.2 - 273.15;
};

IR_ACCESS_AMB = function(raw){
    return raw * 0.2 - 273.15;
};

IR_TOP1_AMB = function(raw){
    return raw * 0.2 - 273.15;
};

exports.ir_ambient_temperatures.push(IR_FLASH_AMB, IR_SIDE1_AMB, IR_SIDE2_AMB, IR_RBF_AMB, IR_ACCESS_AMB, IR_TOP1_AMB);

ACCELEROMETER_X = function(raw){
    return raw/16384;
};

ACCELEROMETER_Y = function(raw){
    return raw/16384;
};

ACCELEROMETER_Z = function(raw){
    return raw/16384;
};

exports.imu_accelerometer.push(ACCELEROMETER_X, ACCELEROMETER_Y, ACCELEROMETER_Z);

GYROSCOPE_X = function(raw){
    return raw/131;
};

GYROSCOPE_Y = function(raw){
    return raw/131;
};

GYROSCOPE_Z = function(raw){
    return raw/131;
};

exports.imu_gyroscope.push(GYROSCOPE_X, GYROSCOPE_Y, GYROSCOPE_Z);

MAGNETOMETER_X = function(raw){
    return raw/390;
};

MAGNETOMETER_Y = function(raw){
    return raw/390;
};

MAGNETOMETER_Z = function(raw){
    return raw/390;
};

exports.imu_magnetometer.push(MAGNETOMETER_X, MAGNETOMETER_Y, MAGNETOMETER_Z);

module.exports = exports;
