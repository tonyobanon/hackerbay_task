'use strict';

var constants = {
    code: {
    },
    message: {
        METHOD_NOT_IMPLEMENTED: 'Method not Implemented',
        ACCESS_DENIED: 'Access Denied',
        INTERNAL_SERVER_ERROR: 'Internal server error',
        INVALID_PARAMS: 'Invalid Params',
        INVALID_VERSION: 'Unsupported API version requested',
        INVALID_CREDENTIALS: 'Invalid Credentials',
        INVALID_SESSION: 'Invalid Session',
        ISSUER_PRIVATE_KEY_NOT_FOUND: 'Issuer private key not found',
        ISSUER_PUBLIC_KEY_NOT_FOUND: 'Issuer public key not found',
        METHOD_NOT_ALLOWED: 'Method not allowed',
        BAD_REQUEST: 'Bad request',
        RESOURCE_ERROR: 'Resource error',
        INVALID_JWT: 'Invalid JWT',
        UNKNOWN_JWT: 'Unknown JWT',
        JWT_TOKEN_ISSUER_MISMATCH: 'Jwt Token issuer mismatch',
        INVALID_STRING_FORMAT: 'Invalid string format',
        UNABLE_TO_GENERATE_JWT: 'Unable to generate Jwt'
    },
};

module.exports = constants;
