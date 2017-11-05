function generateErrorInfo(){
  var Chance = require('chance');
  var chance = new Chance();

  var ErrorInfo = require('../server/routes/common/errorInfo');

  for (var tid = 1; tid <= 100; tid++) {
    for (var i = 0; i < 5; i++) {
      var randomErrorCode = chance.natural({min: 1, max: 20});
      ErrorInfo.addErrorInfo({index: i, tid: tid, errorCode: randomErrorCode});
    }
  }
}

module.exports = generateErrorInfo;


