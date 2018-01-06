var Chance = require('chance'); // import constructor
var chance = new Chance(); // create instance of chance object

function generatePreamble() {
  return {
    callsign: chance.word(),
    timestamp: chance.integer(),
    messageState: chance.integer(),
    opState: chance.integer(),
    bytesInData: chance.integer()
  }
}

module.exports = generatePreamble;
