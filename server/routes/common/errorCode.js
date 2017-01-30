var db = require('../../database/_db');

var ErrorCode = db.model('errorCode');

var exportObj = {};

exportObj.addErrorCode = function(error){
  return ErrorCode.create(error)
  .then(function(createdError){

  })
}

exportObj.findAllErrorCodes = function(){
  return ErrorCode.findAll();
}


module.exports = exportObj;
