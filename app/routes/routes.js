'use strict';

module.exports.register = function(server, serviceLocator, docs) {

    const httpStatusCode  = require('http-status');
    const middlewares = require('../middlewares/index');

    let authController = serviceLocator.get('authController');
    let imageController = serviceLocator.get('imageController');
    let jsonPatchController = serviceLocator.get('jsonPatchController');

    //Login / Logout Endpoints

    server.post({
        path: '/auth/login',
        name: 'Login',
        version: '1.0.0',
        scope: 'hackerbay_task'
    }, (req, res, next) => authController.login(req, res, next));

    server.post({
        path: '/auth/logout',
        name: 'Logout',
        version: '1.0.0',
        scope: 'hackerbay_task'
    }, (req, res, next) => authController.logout(req, res, next));

    //Auth middleware
    server.use(middlewares.auth);

    //Image Resize

    server.get({
            path: '/protected/image/resize',
            name: 'Generate Image Thumbnail',
            version: '1.0.0',
            scope: 'hackerbay_task'
        },
        (req, res, next) => imageController.generateThumbnail(req, res, next));

    //Json Patch

    server.post({
            path: '/protected/json/patch',
            name: 'Patch Json',
            version: '1.0.0',
            scope: 'hackerbay_task'
        },
        (req, res, next) => jsonPatchController.patchJson(req, res, next));

    //Ping

    server.get({
            path: '/protected/ping',
            name: 'Ping',
            version: '1.0.0',
            scope: 'hackerbay_task'
        }, (req, res) => {
            res.send(httpStatusCode.OK);
        });

    //Swagger Docs

    if (process.env.NODE_ENV !== 'production') {

        server.get({
            path: '/api-docs',
            name: 'swagger_docs_v2',
            scope: 'hackerbay_task',
            version: '1.0.0'
        }, (req, res, next) => {
            res.contentType = 'text/plain';
            res.send(docs);
            next();
        });
    }
};
