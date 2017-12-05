'use strict';

let errors          = require('../errors');
let httpStatusCode  = require('http-status');

module.exports.register = function setup(server) {

    server.on('NotFound', function(req, res) {
        server.metrics.increment('request.not_found');
        res.send(httpStatusCode.NOT_FOUND, new errors.MethodNotImplemented());
    });

    server.on('VersionNotAllowed', function(req, res) {
        server.metrics.increment('request.version_not_allowed');
        res.send(httpStatusCode.NOT_FOUND, new errors.VersionNotAllowedError());
    });

    server.on('InvalidVersion', function(req, res) {
        server.metrics.increment('request.invalid_version');
        res.send(httpStatusCode.NOT_FOUND, new errors.VersionNotAllowedError());
    });

    /* istanbul ignore next: untestable */
    server.on('uncaughtException', function(req, res, route, err) {
        server.metrics.increment('request.uncaught_exception');
        res.send(httpStatusCode.INTERNAL_SERVER_ERROR, new errors.InternalServerError(err.toString()));
    });

    server.on('MethodNotAllowed', function(req, res) {
        server.metrics.increment('request.method_not_allowed');
        res.send(httpStatusCode.BAD_REQUEST, new errors.MethodNotAllowedError());
    });
};
