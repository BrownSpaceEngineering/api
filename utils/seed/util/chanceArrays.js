var Chance = require('chance'); // import constructor
var chance = new Chance(); // create instance of chance object

function generateFloatArray(len) {
  vals = []
  for (var i=0; i<len; i++) {
    vals.push(chance.floating())
  }
  return vals;
}

module.exports = generateFloatArray;
