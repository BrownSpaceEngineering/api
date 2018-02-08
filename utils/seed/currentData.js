var Chance = require('chance');
var chance = new Chance();

function generateCurrentData() {
  return {
    time_to_next_flash: chance.integer(),
    reboot_count: chance.integer(),
    lion_voltages: [chance.floating(), chance.floating()],
    lion_currents: [chance.floating(), chance.floating()],
    lion_temperature: [chance.integer(), chance.integer()],
    battery_charging_analog_voltages: [chance.floating(), chance.floating()],
    bettery_charging_digital_signals: [chance.bool() ? 1 : 0,
      chance.bool() ? 1 : 0, chance.bool() ? 1 : 0, chance.bool() ? 1 : 0, chance.bool() ? 1 : 0,
      chance.bool() ? 1 : 0, chance.bool() ? 1 : 0, chance.bool() ? 1 : 0, chance.bool() ? 1 : 0,
      chance.bool() ? 1 : 0, chance.bool() ? 1 : 0, chance.bool() ? 1 : 0, chance.bool() ? 1 : 0,
      chance.bool() ? 1 : 0, chance.bool() ? 1 : 0, chance.bool() ? 1 : 0],
    lifepo_voltages: [chance.floating({fixed: 2}), chance.floating({fixed: 2}),
      chance.floating({fixed: 2}), chance.floating({fixed: 2})]
  }
}

module.exports = generateCurrentData;
