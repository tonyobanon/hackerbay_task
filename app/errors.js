'use strict';

const create    = require('custom-error-generator');
const constants = require('../app/constants');

module.exports = {

    InvalidJwt: create('InvalidJwt', { code: 'INVALID_JWT', defaultMessage: constants.message.INVALID_JWT}),

    UnknownJwt: create('InvalidJwt', { code: 'UNKNOWN_JWT', defaultMessage: constants.message.UNKNOWN_JWT}),

    JwtTokenIssuerMismatch: create('JwtTokenIssuerMismatch', { code: 'JWT_TOKEN_ISSUER_MISMATCH',
        defaultMessage: constants.message.JWT_TOKEN_ISSUER_MISMATCH}),

    UnableToGenerateJwt: create('UnableToGenerateJwt', { code: 'UNABLE_TO_GENERATE_JWT',
        defaultMessage: constants.message.UNABLE_TO_GENERATE_JWT}),

    InvalidVersion: create('InvalidVersion', { code: 'INVALID_VERSION',
        defaultMessage: constants.message.INVALID_VERSION}),

    MethodNotImplemented: create('MethodNotImplemented', { code: 'METHOD_NOT_IMPLEMENTED',
        defaultMessage: constants.message.METHOD_NOT_IMPLEMENTED}),

    MethodNotAllowedError: create('MethodNotAllowed', { code: 'METHOD_NOT_ALLOWED',
        defaultMessage: constants.message.METHOD_NOT_ALLOWED}),

    VersionNotAllowedError: create('VersionNotAllowed', { code: 'VERSION_NOT_ALLOWED',
        defaultMessage: constants.message.INVALID_VERSION}),

    InvalidParams: create('InvalidParamsError', { code: 'INVALID_PARAMS',
        defaultMessage: constants.message.INVALID_PARAMS}),

    InternalServerError: create('InternalServerError', { code: 'INTERNAL_SERVER_ERROR',
        defaultMessage: constants.message.INTERNAL_SERVER_ERROR}),

    InvalidCredentialsError: create('InvalidCredentialsError', { code: 'INVALID_CREDENTIALS',
        defaultMessage: constants.message.INVALID_CREDENTIALS}),

    InvalidStringFormat: create('InvalidStringFormat', { code: 'INVALID_STRING_FORMAT',
        defaultMessage: constants.message.INVALID_STRING_FORMAT}),

    IssuerPrivateKeyNotFound: create('IssuerPrivateKeyNotFound', { code: 'ISSUER_PRIVATE_KEY_NOT_FOUND',
        defaultMessage: constants.message.ISSUER_PRIVATE_KEY_NOT_FOUND}),

    IssuerPublicKeyNotFound: create('IssuerPublicKeyNotFound', { code: 'ISSUER_PUBLIC_KEY_NOT_FOUND',
        defaultMessage: constants.message.ISSUER_PUBLIC_KEY_NOT_FOUND}),

    InvalidSession: create('InvalidSession', { code: 'INVALID_SESSION',
        defaultMessage: constants.message.INVALID_SESSION}),

    ResourceFetchError: create('ResourceFetchError', { code: 'RESOURCE_FETCH_ERROR',
        defaultMessage: constants.message.ResourceFetchError}),

};
