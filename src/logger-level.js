'use strict';

const Levels = ["DEBUG", "INFO", "WARN", "ERROR"];

module.exports = {
  getLogLevel: function(level) {
    if (level) {
      for (let index = 0; index < Levels.length; index++) {
        if (level.toUpperCase() === Levels[index]) {
          return Levels[index];
        }
      }
    }

    return "INFO";
  }
};