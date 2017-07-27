'use strict';

/*
 * Override the LoggingEvent, see log4js/logger.js
 */
function LoggingEvent(categoryName, level, data, logger, req) {
  this.startTime = new Date();
  this.categoryName = categoryName;
  this.data = data;
  this.level = level;
  this.logger = logger;
  this.req = req;
}

module.exports = LoggingEvent;