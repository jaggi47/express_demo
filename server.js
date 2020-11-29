'use_strict';

// starting configuration
let allowedConfigs = new Set(['development', 'test', 'production']);
if (!allowedConfigs.has(process.env.NODE_ENV)) {
  console.log("please specify valid NODE_ENV to run server");
}

process.env.NODE_CONFIG_DIR = __dirname + '/configuration/';
config = require('config');

process.configuration = config;


//Importing and declaring Libraries
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const apihandler = require('./router');
const cors = require("cors");
const passport = require("passport");
let app = express();
global.base_dir = __dirname;
app.use(passport.initialize());
app.set('view engine', 'ejs');
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
// app.use(customRequestLogger.create());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, app_version, device_type, access_token,app_secret_key, auth_token, Authorization");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS,PATCH');
  next();
});

// all api's

app.use('/api', apihandler);

app.set('port', process.env.PORT || config.get('PORT'));

httpServer = http.createServer(app);
httpServer.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
