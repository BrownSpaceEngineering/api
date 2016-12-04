var Temperature = require('./models/temperature');
var Error_code = require('./models/error_code');
var chance = new require('chance')();

function seed(){
    for (var i = 0; i < 100; i++) {
      Temperature.create({
        value: Math.random() * 100
      })
    }

    for (var i = 0; i < 50; i++) {
      Error_code.create({
        value: chance.string({length: 5})
      })
    }
}

module.exports = seed;
