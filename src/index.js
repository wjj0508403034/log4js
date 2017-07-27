'use strict';

const log4js = require('log4js');
const Logger = require("./logger");
const LoggerLayout = require("./logger-layout");
const fs = require('fs');

let initilized = false;

function getDefaultOptions() {
  let LogFolder = "/logs/";
  let LogFileName = `application.log`;

  let folderExists = fs.existsSync(LogFolder);
  if (!folderExists) {
    fs.mkdirSync(LogFolder);
  }

  let LogFile = `${LogFolder}${LogFileName}`;

  let options = {
    "levels": {
      "[all]": "INFO"
    },
    "appenders": [{
      "type": "console",
      "layout": LoggerLayout
    }, {
      "type": "dateFile",
      "filename": LogFile,
      "pattern": "-yyyy-MM-dd",
      "alwaysIncludePattern": false,
      "compress": true,
      "layout": LoggerLayout
    }]
  };

  return options;
}

function configureLog4js(options) {
  log4js.configure(options);
  initilized = true;
}

module.exports = {
  configure: function(options) {
    configureLog4js(options || getDefaultOptions());
  },
  getLogger: function(req, loggerName) {
    if (!initilized) {
      configureLog4js(getDefaultOptions());
    }

    var logger = log4js.getLogger(loggerName);
    if (!logger.requestLogger) {
      logger.requestLogger = new Logger(logger);
    }

    return logger.requestLogger;
  }
};