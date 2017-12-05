'use strict';

let errors = require('../errors');
let httpStatus = require('http-status');

class AuthController {

    /**
     * @param authService Authentication Service instance
     * @param {logging} logging Instance of logging
     * @param {Metrics} metrics Instance of metrics
     */
    constructor(logging, metrics, authService) {

        this.logging = logging;
        this.metrics = metrics;
        this.authService = authService;
    }

    /**
     * Endpoint to allow users to login and generate a JWT token to represent
     * their session.
     * @param  {Request}  req  The http request object
     * @param  {Response} res  The http response object
     * @param  {Function} next Callback to indicate that the next middleware can be initiated
     */
    login(req, res, next) {

        let username = req.body.username;
        let password = req.body.password;

        if (!/^[a-z0-9]{3,24}$/i.test(username)) {
            res.send(httpStatus.BAD_REQUEST, errors.InvalidParams('Please enter a valid username'));
            return next();
        }

        let context = this._extractRequestContext(req);

        this.metrics.increment('auth.request.login');

        this.authService.login(username, password, context)

            .then((token) => {
                this.metrics.increment('auth.response.login.ok');
                res.send(httpStatus.OK, {
                    jwt_token: token,
                    timestamp: Date.now()
                });
            })

            .catch((err) => {
                this.metrics.increment(`auth.response.login.error.${err.code.toLowerCase()}`);
                res.send(httpStatus.FORBIDDEN, err);
            })

            .then(() => {
                return next();
            });
    }

    /**
     * Endpoint to logout users based on JWT token
     * @param  {Request}  req  The http request object
     * @param  {Response} res  The http response object
     * @param  {Function} next Callback to indicate that the next middleware can be initiated
     */
    logout(req, res, next) {

        let jwtToken = req.body.jwt_token;

        this.metrics.increment('auth.request.logout');

        return this.authService.logout(jwtToken)

            .then(() => {
                this.metrics.increment('auth.response.logout.ok');
                res.send(httpStatus.OK, {
                    timestamp: Date.now()
                });
            })

            .catch(err => {

                this.metrics.increment(`auth.response.logout.error.${err.code.toLowerCase()}`);
                res.send(httpStatus.BAD_REQUEST, err);
            })

            .then(() => {
                return next();
            });
    }

    /**
     * Helper function to extract the login context information used during the
     * logging of the login attempt.
     * @param  {Request} req Http request object
     * @return {Object}     Login http context; ip address, user agent etc.
     */
    _extractRequestContext(req) {
        let context = {};

        let userAgent = req.headers['user-agent'];
        if (userAgent) {
            context.userAgent = userAgent;
        }

        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (ip) {
            context.ipAddress = ip;
        }

        return context;
    }
}

module.exports = AuthController;
