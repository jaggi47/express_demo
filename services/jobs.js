exports.list = list
exports.create = create;
exports.getInfo = getInfo;
exports.insertApplication = insertApplication;
exports.getApplication = getApplication;

const dbHandler                    = require('../db').dbHandler;


function list(payload) {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM jobs WHERE created_by = ?`;
      let queryObj = {
        query : query,
        args  : [payload.user_id],
        event : "list"
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
      let query = `INSERT INTO jobs SET ?`;
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
  
  function getInfo(payload) {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM applied_jobs WHERE user_id = ? and job_id = ?`;
      let queryObj = {
        query : query,
        args  : [payload.user_id, payload.job_id],
        event : "getInfo"
      };
  
      dbHandler.executeQuery(queryObj).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  function insertApplication(payload) {
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO applied_jobs SET ?`;
      let queryObj = {
        query : query,
        args  : [payload],
        event : "insertApplication"
      };
  
      dbHandler.executeQuery(queryObj).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  function getApplication(payload) {
    return new Promise((resolve, reject) => {
      let query = `SELECT
      u.name,
          u.email,
          j.title,
          j.description,
          j.address,
          j.type
      FROM
          jobs j
      JOIN
          applied_jobs aj
      ON
          j.id = aj.job_id
      JOIN
          users u
      ON
          aj.user_id = u.id
      WHERE
          j.created_by = ?`;
      let queryObj = {
        query : query,
        args  : [payload.user_id],
        event : "getApplication"
      };
  
      dbHandler.executeQuery(queryObj).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }