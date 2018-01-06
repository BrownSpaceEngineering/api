var Chance = require('chance'); // import constructor
var chance = new Chance(); // create instance of chance object

function generateRaw(){
  return chance.string({pool: '01', length: 32}) // just a placeholder for now since we don't have any real byte conversion yet.
}

module.exports = generateRaw;

