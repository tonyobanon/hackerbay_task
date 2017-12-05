'use strict';

let utils           = require('./app/utils');
let restify         = require('restify');
let handlers        = require('./app/routes/handlers');
let versioning      = require('restify-url-semver');
let config          = require('./app/config/config');
let routes          = require('./app/routes/routes');
let formatter       = require('./app/lib/jsend_formatter');

let serviceLocator = require('./app/config/di');

let yamljs = require('yamljs');
let docs   = yamljs.load('swagger.yaml');

let joi = require('joi');

/**Initialize web service.**/
let server = restify.createServer({
    name: 'HackerBay',
    versions: ['1.0.0'],
    formatters: {
        'application/json': formatter
    }
});

// enable CORS for documentation to be used on the staging environment
if (process.env.NODE_ENV !== 'production') {
    server.use(restify.CORS());
}

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

let logger = serviceLocator.get('logger');

/** RouteStats **/
server.metrics = serviceLocator.get('metrics');
var RouteStats = require('./app/lib/routestats');
var routeStats = new RouteStats(server.metrics, utils.resolveRouteName);

/** RouteStats middleware. **/
server.use(function(req, res, next) {
    routeStats.record(req, res);
    next();
});

/** Enforce API versioning **/
server.pre(versioning({prefix: '/'}));

let validationMiddleware = require('./app/lib/validation');
server.use(validationMiddleware.paramValidation(joi, logger, {})); // verification for request parameters

/** catch fatal errors on startup**/
/* istanbul ignore next: untestable */
process.on('uncaughtException', function(er) {
    server.metrics.increment('error.uncaught_exception');
    logger.error(er.stack);
    logger.error(er);
    process.exit(1);
});

handlers.register(server);
routes.register(server, serviceLocator, docs);

server.listen(config.web.port, '0.0.0.0', function() {
    server.metrics.increment('server.start');
    logger.info('%s listening at %s', server.name, server.url);

    if (process.env.NODE_ENV === 'development') {
        require('./app/lib/route_table')(server.router.mounts);
    }
});

module.exports = server;
