'use strict';

let httpStatus = require('http-status');
const errors = require('../errors');
const serviceLocator = require('../lib/service_locator');

let authService = serviceLocator.get('authenticationService');

/**
 * Middleware to verify that a JWT token is still valid ("logged in" / active)
 * @param  {Request}  req  The http request object
 * @param  {Response} res  The http response object
 * @param  {Function} next Callback to indicate that the next middleware can be initiated
 */
module.exports = (req, res, next) => {

    if (!req.url.startsWith('/protected')) {
        return next();
    }

    function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }

        return null;
    }

    let jwtToken = fromHeaderOrQuerystring(req);

    if (!jwtToken) {
        res.send(httpStatus.FORBIDDEN, errors.InvalidJwt('Please provide a valid Jwt token in this request'));
    }

    return authService.verify(jwtToken)
        .then(() => {
            return next();
        })
        .catch(err => {
            res.send(httpStatus.FORBIDDEN, err);
        });
};
