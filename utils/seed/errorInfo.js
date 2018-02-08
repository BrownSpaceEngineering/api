function generateErrorInfo(){
  var Chance = require('chance');
  var chance = new Chance();
  var errors = [];

  for (var i = 1; i <= 100; i++) {
    errors.push(chance.natural({min: 1, max: 20}));
  }

  return errors;
}

module.exports = generateErrorInfo;
