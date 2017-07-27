'use strict';


const Layout = {
  "type": "pattern",
  "pattern": "%d\t%p\tSessionId[%x{sessionId}]\tUser[%x{user}]\tComponent[%h]\t\t\t\tHandler[%c]\t%n%m",
  "tokens": {
    sessionId: function(logEvent) {
      return "";
    },
    user: function(logEvent) {
      return "";
    }
  }
};

module.exports = Layout;