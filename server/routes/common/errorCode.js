var db = require('../../database/_db');

var ErrorInfo = db.model('errorInfo');

var exportObj = {};

exportObj.addErrorCode = function(error){
  return ErrorInfo.create(error);
}

exportObj.findAllErrorCodes = function(){
  return ErrorInfo.findAll()
}

exportObj.getErrorCodeById = function(id) {
  return ErrorInfo.getById(id);
}

exportObj.getErrorCodesByTid = function(tid) {
  return ErrorInfo.findAll({
    where: {
      tid: tid
    }
  });
}

exportObj.deleteErrorCode = function(id) {
  return ErrorInfo.delete(id)
  .then(function(deletedError) {

  })
}

exportObj.updateErrorCode = function(id, newData) {
  return ErrorInfo.update(id, newData);
}


module.exports = exportObj;
