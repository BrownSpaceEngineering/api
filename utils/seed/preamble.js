var Chance = require('chance'); // import constructor
var chance = new Chance(); // create instance of chance object

function generatePreamble() {
  return {
    callsign: chance.word(),
    timestamp: chance.integer(),
    message_state: chance.integer(),
    op_state: chance.integer(),
    bytes_in_data: chance.integer()
  }
}

module.exports = generatePreamble;
