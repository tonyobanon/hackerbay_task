'use strict';

let mockery = require('mockery');

let loggerInstance = {
    info: function() {},

    debug: function() {},

    warn: function() {},

    error: function() {}
};

let logger = {
    create: function() {
        return loggerInstance;
    }
};

let mockLogging = function() {

    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });

    //required from di.js
    mockery.registerMock('../lib/logging', logger);
};

module.exports = {
    mock: mockLogging
};
