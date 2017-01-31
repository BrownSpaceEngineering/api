var db = require('../../database/_db');

var ErrorCode = db.model('errorCode');

var exportObj = {};
//TODO: Rename ErrorCode methods to proper Sequelize names
exportObj.addErrorCode = function(error){
  return ErrorCode.create(error)
  .then(function(createdError){
    createdError.validation = 'Jason'
    return createdError;
  })
}

exportObj.findAllErrorCodes = function(){
  return ErrorCode.findAll()
}

exportObj.getErrorCodeByID = function(id) {
  return ErrorCode.getByID(id);
}

exportObj.getErrorCodesByType = function(type) {
  return ErrorCode.getByType(type);
}

exportObj.deleteErrorCode = function(id) {
  return ErrorCode.delete(id)
  .then(function(deletedError) {

  })
}

exportObj.updateErrorCode = function(id, newData) {
  return ErrorCode.update(id, newData)
  .then(function(updatedError) {

  })
}


module.exports = exportObj;
