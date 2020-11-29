

const mysql     = require('mysql');
const config    = require('config');


let connection = mysql.createPool({
  host            : config.get('MYSQL.host'),
  user            : config.get('MYSQL.user'),
  password        : config.get('MYSQL.password'),
  database        : config.get('MYSQL.database'),
});

connection.getConnection((err, connection) => {
  if(err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log("mysql connected " );
});

let dbHandler = {
  executeQuery : function (queryObj) {
    return new Promise((resolve, reject) => {
      const start = new Date();
      queryObj.query = queryObj.query.replace(/\s+/g, " ");
      let finalQuery = connection.query(queryObj.query, queryObj.args, (err, result) => {
        queryObj.sql = finalQuery.sql;
        queryObj.sql = queryObj.sql.replace(/[\n\t]/g, '');
  
        let event = queryObj.event || "Executing mysql query";

        if(err && err.code !== 'ER_DUP_ENTRY'){
          let message = `*QUERY ERROR*`;
          message += "\n*Query* :" +  finalQuery.sql;
          message += "\n*Error* :" + err;

        }

        if(err && (err.code === 'ER_LOCK_DEADLOCK' || err.code === 'ER_QUERY_INTERRUPTED')) {
          setTimeout(() => {
            module.exports.dbHandler.executeQuery(queryObj)
              .then(result => resolve(result), (error, result) => reject(error, result));
          }, 50);
        } else if(err) {
          return reject(err, result);
        } else {
          return resolve(result);
        }
      });
    });
  },

  query : function (event, sql, values, cb) {
    const start = new Date();
    let queryObj = connection.query(sql, values, (err, result) => {
      return cb(err, result);
    });
  },

  escape : function (values) {
    return connection.escape(values);
  }
};

module.exports.connection  =  connection;
module.exports.dbHandler   =  dbHandler;
