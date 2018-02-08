var generateTransmission = require('../seed');
var request = require("request-promise");

console.log(request(''))

var options = {
  uri: "/receiveData",
  qs: generateTransmission(),
}

request(options)
.then(function(res) {
  console.log(res)
})
