'use strict';

let sinon = require('sinon');
const joi    = require('joi');

let assert = require('chai').assert;

let mockery = require('mockery');

let jwtFixtures = require('test/fixtures/lib/jwt');

let mocks = require('test/helpers/mocks');

let mockedConfig = mocks.mockedConfig;
let mockedLogger = mocks.mockedLogger;
let mockedMetrics = mocks.mockedMetrics;

let errors = require('app/errors');
let jsonwebtoken = require('jsonwebtoken');

let Jwt = require('app/lib/jwt');
let jwt;

let sandbox = sinon.sandbox.create();

describe('Jwt', () => {

    before(() => {
        mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        jwt = new Jwt(mockedConfig, mockedLogger, mockedMetrics, jsonwebtoken);
    });

    after(() => {
        // completely restore all fakes created through the sandbox
        sandbox.restore();

        mockery.deregisterAll();
        mockery.disable();
    });

    describe('.createToken', () => {

        it('should correctly return a unique jwt token each time, given the same input data', (done) => {

            let tokenData = jwtFixtures.jwtTokenData;

            jwt.createToken(tokenData.jti, tokenData.iss, tokenData.sToken, false)
                .then((jwtToken) => {
                    assert.notDeepEqual(jwtToken, jwtFixtures.jwtToken);
                })
                .catch(err => {
                    assert.fail(`Jwt token generation error: ${err.message}`);
                })
                .then(() => {
                    done();
                });
        });

        it('should fail if the issuer private key was not found', (done) => {

            let tokenData = jwtFixtures.jwtTokenData;

            //remove private key
            let originalPrivateKey = jwt.config.jwt[tokenData.iss + '_private_key'];
            jwt.config.jwt[tokenData.iss + '_private_key'] = undefined;

            jwt.createToken(tokenData.jti, tokenData.iss, tokenData.sToken, false)
                .then(() => {
                    assert.fail('Jwt token should not be generated');
                })
                .catch(err => {
                    if (err instanceof errors.IssuerPrivateKeyNotFound) {
                        assert.ok(err);
                    } else {
                        assert.fail('Unknown error was thrown');
                    }
                })
                .then(() => {
                    //put back private key
                    jwt.config.jwt[tokenData.iss + '_private_key'] = originalPrivateKey;
                    done();
                });
        });

    });

    describe('.verifyToken', () => {

        it('should return the decoded data of the jwt token, in the proper format', (done) => {

            let jwtTokenData = jwtFixtures.jwtTokenData;

            jwt.verifyToken(jwtFixtures.jwtToken, jwtFixtures.jwtIssuer)
                .then((tokenData) => {

                    let schema = {
                        jti: joi.number().valid(jwtTokenData.jti).required(),
                        iss: joi.string().valid(jwtTokenData.iss).required(),
                        sToken: joi.string().valid(jwtTokenData.sToken).required(),
                        iat: joi.number(),
                        exp: joi.number()
                    };

                    joi.assert(tokenData, schema);
                })
                .catch(err => {
                    assert.fail(err.message);
                })
                .then(() => {
                    done();
                });
        });

        it('should fail if the issuer public key was not found', (done) => {

            //remove public key
            let originalPublicKey = jwt.config.jwt[jwtFixtures.jwtIssuer + '_public_key'];
            jwt.config.jwt[jwtFixtures.jwtIssuer + '_public_key'] = undefined;

            jwt.verifyToken(jwtFixtures.jwtToken, jwtFixtures.jwtIssuer)
                .then(() => {
                    assert.fail('Jwt token verification should fail, since the issuer public key is invalid');
                })
                .catch(err => {
                    if (err instanceof errors.IssuerPublicKeyNotFound) {
                        assert.ok(err);
                    } else {
                        assert.fail('Unknown error was thrown');
                    }
                })
                .then(() => {
                    //put back public key
                    jwt.config.jwt[jwtFixtures.jwtIssuer + '_public_key'] = originalPublicKey;
                    done();
                });
        });

        it('should fail if the jwt token is invalid', (done) => {

            jwt.verifyToken(jwtFixtures.invalidJwtToken, jwtFixtures.jwtIssuer)
                .then(() => {
                    assert.fail('Jwt token should be identified as an invalid token');
                })
                .catch(err => {
                    if (err instanceof errors.InvalidJwt) {
                        assert.ok(err);
                    } else {
                        assert.fail('Unknown error was thrown');
                    }
                })
                .then(() => {
                    done();
                });
        });

        it('should fail if there is a mismatch in the jwt token issuer', (done) => {

            let mockIssuer = 'invalid_issuer';
            let issuer = jwt.config.jwt.issuer;

            //add public key for mock issuer
            jwt.config.jwt[mockIssuer + '_public_key'] = jwt.config.jwt[issuer + '_public_key'];

            jwt.verifyToken(jwtFixtures.jwtToken, mockIssuer)
                .then(() => {
                    assert.fail('Jwt token verification should fail, due to jwt token issuer mismatch');
                })
                .catch(err => {
                    if (err instanceof errors.JwtTokenIssuerMismatch) {
                        assert.ok(err);
                    } else {
                        assert.fail('Unknown error was thrown');
                    }
                })
                .then(() => {
                    done();
                });
        });

    });

});
