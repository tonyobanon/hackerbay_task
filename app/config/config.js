'use strict';

/**
 * Externalised configuration represented as a valid JSON structure, resolving to environment variables.
 * @see dependent config.js and README.md for the exports.
 * @type {object}
 */
var $ = {
    api: {},
    web: {
        port: process.env.WEB_PORT
    },
    logging: {
        level: process.env.LOGGING_LEVEL,
        file: process.env.LOGGING_FILE,
        console: process.env.LOGGING_CONSOLE
    },
    statsd: {
        host: process.env.STATSD_PORT_8125_UDP_ADDR || process.env.STATSD_HOST,
        port: process.env.STATSD_PORT_8125_UDP_PORT || process.env.STATSD_PORT,
        scope: process.env.STATSD_SCOPE || 'hackerbay',
        debug: process.env.STATSD_DEBUG
    },
    jwt: {
        issuer: 'hackerbay',
        algorithm: process.env.JWT_ALGORITHM,
        token_expiry: process.env.JWT_TOKEN_EXPIRY_PERIOD,
        hackerbay_private_key: process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'),
        hackerbay_public_key: process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n')
    },
};

module.exports = $;
