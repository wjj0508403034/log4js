'use strict';

const LoggingEvent = require("./logging-event");

function Logger(logger) {

  function log(req, level, ...args) {
    if (logger.isLevelEnabled(level)) {
      var loggerEvent = new LoggingEvent(logger.category, level, args[0], this, req);
      logger.emit('log', loggerEvent);
    }
  }

  this.info = function(req, ...args) {
    log(req, "INFO", args);
  };

  this.warn = function(req, ...args) {
    log(req, "WARN", args);
  };

  this.debug = function(req, ...args) {
    log(req, "DEBUG", args);
  };

  this.error = function(req, ...args) {
    log(req, "ERROR", args);
  };
}

module.exports = Logger;