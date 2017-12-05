'use strict';

let httpMocks = require('node-mocks-http');

let mockedConfig = require('app/config/config');

let mockedLogger = {
    info: () => {
    },

    debug: () => {
    },

    warn: () => {
    },

    error: () => {
    }
};

let mockedLoggerWithOutput = {
    info: console.log,

    debug: console.log,

    warn: console.log,

    error: console.error
};

let mockedRouteStats = {
    record: () => {

    }
};

let mockedJwt = {
    createToken: () => {
    },

    verifyToken: () => {
    }
};

let mockedDatastore = {
    save: () => {
    },

    update: () => {
    },

    get: () => {
    },

    remove: () => {
    },

    listKeys: () => {
    }
};

let mockedMetrics = {

    increment: () => {
    },

    gauge: () => {
    },

    timing: () => {
    },

    histogram: () => {
    }
};

let mockedReq = httpMocks.createRequest();
let mockedRes = httpMocks.createResponse();

let MockedRequestFactory = function(opts) {
    let defaultOpts = {
        session: {},
        body: {}
    };

    return httpMocks.createRequest(Object.assign({}, defaultOpts, opts));
};

let mockedUtils = {
    resolveRouteName: () => {
    },
};

let mockedServiceInstance = {

    login: () => {
    },

    logout: () => {
    },

    verify: () => {
    },

    generateThumbnail: () => {
    }
};

module.exports = {
    mockedConfig,
    mockedLogger,
    mockedMetrics,
    mockedRouteStats,
    mockedDatastore,
    mockedJwt,
    mockedLoggerWithOutput,
    mockedReq,
    mockedRes,
    MockedRequestFactory,
    mockedUtils,
    mockedServiceInstance
};
