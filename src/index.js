'use strict';

const log4js = require('log4js');
const Logger = require("./logger");
const LoggerLayout = require("./logger-layout");
const LoggerLevel = require("./logger-level");
const fs = require('fs');

let initilized = false;

function getDefaultOptions() {
  let LogFolder = "logs/";
  let LogFileName = `application.log`;

  let folderExists = fs.existsSync(LogFolder);
  if (!folderExists) {
    fs.mkdirSync(LogFolder);
  }

  let LogFile = `${LogFolder}${LogFileName}`;

  let options = {
    appenders: {
      console: {
        "type": "console",
        "layout": LoggerLayout
      },
      file: {
        "type": "dateFile",
        "filename": LogFile,
        "pattern": "-yyyy-MM-dd",
        "alwaysIncludePattern": false,
        "compress": true,
        "layout": LoggerLayout
      }
    },
    categories: {
      default: { appenders: ['console'], level: 'DEBUG' },
      file: { appenders: ['file'], level: 'DEBUG' }
    }
  };

  return options;
}

function configureLog4js(options) {
  let defaultOptions = getDefaultOptions();
  if (options && options.level) {
    defaultOptions.levels["[all]"] = LoggerLevel.getLogLevel(options.level);
  }
  log4js.configure(defaultOptions);
  initilized = true;
}

module.exports = {
  configure: function(options) {
    configureLog4js(options);
  },
  getLogger: function(req, loggerName) {
    if (!initilized) {
      configureLog4js();
    }

    var logger = log4js.getLogger(loggerName);
    if (!logger.requestLogger) {
      logger.requestLogger = new Logger(logger);
    }

    return logger.requestLogger;
  }
};