const { exception } = require('console');

exports.getInfo = getInfo
exports.create = create;
const dbHandler                    = require('../db').dbHandler;


function getInfo(payload) {
    return new Promise((resolve, reject) => {
      let query = `select id, email, password, userType  from users WHERE email = ? and userType = ?`;
      let queryObj = {
        query : query,
        args  : [payload.email, payload.userType],
        event : "getInfo"
      };
  
      dbHandler.executeQuery(queryObj).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  function create(payload) {
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO users SET ?`;
      let queryObj = {
        query : query,
        args  : [payload],
        event : "create"
      };
      dbHandler.executeQuery(queryObj).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }
  