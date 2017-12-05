'use strict';

let serviceLocator    = require('../lib/service_locator');

let DataStore = require('../lib/data_store');
let Jwt = require('../lib/jwt');

let AuthenticationService = require('../services/authentication');
let ImageService = require('../services/image');

let AuthenticationController = require('../controllers/auth_controller');
let ImageController = require('../controllers/image_controller');
let JsonPatchcontroller = require('../controllers/json_pach_controller');

serviceLocator.register('config', () => {
    return require('./config');
});

//Libraries

serviceLocator.register('logger', () => {
    let config = serviceLocator.get('config');
    return require('../lib/logging').create(config);
});

serviceLocator.register('metrics', (serviceLocator) => {
    let config = serviceLocator.get('config');
    let logger = serviceLocator.get('logger');
    return require('../lib/metrics').create(logger, config.statsd);
});

serviceLocator.register('datastore', () => {
    let config = serviceLocator.get('config');
    let logging = serviceLocator.get('logger');
    return new DataStore(config, logging);
});

serviceLocator.register('jwt', () => {

    let config = serviceLocator.get('config');
    let logger = serviceLocator.get('logger');
    let metrics = serviceLocator.get('metrics');

    return new Jwt(config, logger, metrics, require('jsonwebtoken'));
});

//Services

serviceLocator.register('authenticationService', (serviceLocator) => {

    let config = serviceLocator.get('config');
    let logging = serviceLocator.get('logger');
    let metrics = serviceLocator.get('metrics');
    let jwt = serviceLocator.get('jwt');
    let dataStore = serviceLocator.get('datastore');

    return new AuthenticationService(config, logging, metrics, jwt, dataStore);
});

serviceLocator.register('imageService', (serviceLocator) => {

    let config = serviceLocator.get('config');
    let logging = serviceLocator.get('logger');
    let metrics = serviceLocator.get('metrics');

    return new ImageService(config, logging, metrics);
});

//Controllers

serviceLocator.register('authController', (serviceLocator) => {

    let authService = serviceLocator.get('authenticationService');
    let logging = serviceLocator.get('logger');
    let metrics = serviceLocator.get('metrics');

    return new AuthenticationController(logging, metrics,authService);
});

serviceLocator.register('imageController', (serviceLocator) => {

    let imageService = serviceLocator.get('imageService');
    let logging = serviceLocator.get('logger');
    let metrics = serviceLocator.get('metrics');

    return new ImageController(logging, metrics, imageService);
});

serviceLocator.register('jsonPatchController', (serviceLocator) => {

    let logging = serviceLocator.get('logger');
    let metrics = serviceLocator.get('metrics');

    return new JsonPatchcontroller(logging, metrics);
});

module.exports = serviceLocator;
