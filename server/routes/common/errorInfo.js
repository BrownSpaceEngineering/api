var ErrorInfo = require('../../database/models/errorInfo');

var exportObj = {};

exportObj.addErrorInfo = function (error){
  return ErrorInfo.create(error);
};

exportObj.findAllErrorInfo = function (){
  return ErrorInfo.findAll();
};

exportObj.getErrorInfoById = function (id) {
  return ErrorInfo.getById(id);
};

exportObj.getErrorInfosByTid = function (tid) {
  return ErrorInfo.findAll({
    where: {
      tid: tid
    }
  });
};

exportObj.deleteErrorInfo = function (id) {
  return ErrorInfo.destroy({
    where: {
      id: id
    }
  });
};

exportObj.getErrorInfosByCode = function (code){
  return ErrorInfo.findAll({
    where: {
      code: code
    }
  });
};

exportObj.updateErrorInfo = function (id, newData) {
  return ErrorInfo.update(id, newData);
};


module.exports = exportObj;
