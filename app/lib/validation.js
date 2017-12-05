'use strict';

var httpStatus        = require('http-status');
var createError       = require('custom-error-generator');
var InvalidParamError = createError('InvalidParamError', { code: 'INVALID_PARAMS' });
var InvalidContentTypeError = createError('InvalidContentType', { code: 'INVALID_CONTENT_TYPE' });

module.exports = {

    /**
     * @constructor
     *
     * @class validationMiddleware
     *
     * @param joi validation object
     * @param logger object
     * @param validationOptions Options to use for validation.
     *                          For validation options please refer to Joi API documentation.
     *                          https://github.com/hapijs/joi/blob/v7.2.3/API.md#validatevalue-schema-options-callback
     *
     * @return {Function} function matching Restify middleware interface
     */
    paramValidation: function(joi, logger, validationOptions) {

        return function paramValidationMiddleware(req, res, next) {

            var options = validationOptions;
            var validation = req.route.validation; //validation object in route

            if (!validation) {
                return next(); // skip validation if not set
            }

            var validProperties = ['body', 'query', 'params'];

            if (!options) {
                options = {};
            }

            if (!options.allowUnknown) {
                options.allowUnknown = true; // always allow validation to allow unknown fields by default.
            }

            for (var i in validation) {
                if (validProperties.indexOf(i) < 0) {
                    logger.debug('Route contains unsupported validation key');
                    throw new Error('An unsupported validation key was set in route');

                } else {
                    if (req[i] === undefined) {
                        logger.debug('Empty request ' + i + ' was sent');

                        res.send(
                            httpStatus.BAD_REQUEST,
                            new InvalidParamError('Missing request ' + i)
                        );
                        return;
                    }

                    var result = joi.validate(req[i], validation[i], options);

                    if (result.error) {
                        logger.debug('validation error - %s', result.error);

                        res.send(
                            httpStatus.BAD_REQUEST,
                            new InvalidParamError(
                                'Invalid request ' + i + ' - ' + result.error.details[0].message
                            )
                        );
                        return;

                    } else {
                        logger.debug('successfully validated request parameters');
                    }
                }
            }

            next();
        };
    },

    /**
     * @constructor
     *
     * @class headerValidationMiddleware
     *
     * @param logger An instance of the Konga-logging object
     *
     * @return {Function} function matching Restify middleware interface
     */
    headerValidation: function(logger) {

        return function headerValidationMiddleware(req, res, next) {

            var headerValidation = req.route.accept; //accept property in route

            if (!headerValidation) {
                return next(); // skip validation if not set
            }

            if (req.headers['content-type'].indexOf(req.route.accept) === 0) {
                logger.debug('request content-type correct - ', req.headers['content-type']);

                return next();
            } else {

                logger.error('request content-type incorrect - ', req.headers['content-type']);

                res.send(
                    httpStatus.BAD_REQUEST,
                    new InvalidContentTypeError(
                        'Invalid content-type - expecting ' + req.route.accept
                    )
                );
            }
        };
    }
};
