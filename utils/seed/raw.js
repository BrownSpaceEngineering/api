function generateRaw(){
  var Chance = require('chance'); // import constructor
  var chance = new Chance(); // create instance of chance object

  var Raw = require('../server/routes/common/raw');

  for (var i = 0; i < 100; i++) {
    var randomRaw = chance.string({length: 864, pool: '0123456789abcdef'});
    Raw.addRaw({raw: randomRaw});
  }
}

module.exports = generateRaw;


