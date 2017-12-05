'use strict';

let sinon = require('sinon');

let assert = require('chai').assert;

let mockery = require('mockery');

let fixtures = require('test/fixtures/services/authentication');

let mocks = require('test/helpers/mocks');

let mockedConfig = mocks.mockedConfig;
let mockedLogger = mocks.mockedLogger;
let mockedMetrics = mocks.mockedMetrics;
let mockedJwt = mocks.mockedJwt;
let mockedDatastore = mocks.mockedDatastore;

let errors = require('app/errors');

let AuthService = require('app/services/authentication');
let authService;

let sandbox = sinon.sandbox.create();

describe('AuthService', () => {

    before(() => {
        mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        authService = new AuthService(mockedConfig, mockedLogger, mockedMetrics, mockedJwt, mockedDatastore);
    });

    after(() => {
        mockery.deregisterAll();
        mockery.disable();

        // completely restore all fakes created through the sandbox
        sandbox.restore();
    });

    afterEach(() => {
        // completely restore all fakes created through the sandbox
        sandbox.restore();
    });

    describe('.login', () => {

        it('should return a jwt token, on successful login', (done) => {

            sandbox.stub(mockedJwt, 'createToken').resolves(fixtures.jwtToken);

            authService.login('username', 'p@55w0rd', {})
                .then((tokenData) => {
                    assert.equal(tokenData, fixtures.jwtToken);
                })
                .catch(err => {
                    assert.fail(err.message);
                })
                .then(() => {
                    done();
                });

        });

        it('should fail if the jwt token issuer is invalid', (done) => {

            let originalIssuer = authService.config.jwt.issuer;
            let mockIssuer = 'invalid_issuer';

            //replace with invalid issuer
            authService.config.jwt.issuer = mockIssuer;

            sandbox.stub(authService, '_getSessionToken').resolves(fixtures.sessionTokenEntity);

            //.
            sandbox.stub(mockedJwt, 'createToken').rejects(errors.IssuerPrivateKeyNotFound());

            authService.login('username', 'p@55w0rd', {})
                .then(() => {
                    assert.fail(`Login should should fail because no private key will be found for: ${mockIssuer}`);
                })
                .catch(err => {
                    if (err instanceof errors.IssuerPrivateKeyNotFound) {
                        assert.ok(err);
                    } else {
                        assert.fail('Unknown error was thrown');
                    }
                })
                .then(() => {
                    authService.config.jwt.issuer = originalIssuer;
                    done();
                });
        });

    });

    describe('.verify', () => {

        it('should fail if an invalid jwt token is provided', (done) => {

            //.
            sandbox.stub(mockedJwt, 'verifyToken').rejects(errors.InvalidJwt('Unable to validate JWT token'));

            authService.verify(fixtures.invalidJwtToken)
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

        it('should fail if an unknown jwt token is provided', (done) => {

            sandbox.stub(mockedJwt, 'verifyToken').resolves(fixtures.jwtTokenData);
            sandbox.stub(authService, '_getJWT').resolves(null);

            authService.verify(fixtures.jwtToken)
                .then(() => {
                    assert.fail('Jwt token should be identified as an unknown token');
                })
                .catch(err => {
                    if (err instanceof errors.UnknownJwt) {
                        assert.ok(err);
                    } else {
                        assert.fail('Unknown error was thrown');
                    }
                })
                .then(() => {
                    done();
                });
        });

        it('should fail if an inactive jwt token is provided', (done) => {

            sandbox.stub(mockedJwt, 'verifyToken').resolves(fixtures.jwtTokenData);
            sandbox.stub(authService, '_getJWT').resolves(fixtures.expiredJwtTokenEntity);

            authService.verify(fixtures.jwtToken)
                .then(() => {
                    assert.fail('Jwt token should be identified as an inactive token');
                })
                .catch(err => {
                    if (err instanceof errors.InvalidSession) {
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

    describe('.logout', () => {

        it('should logout successfully if the jwt token is valid', (done) => {

            sandbox.stub(mockedJwt, 'verifyToken').resolves(fixtures.jwtTokenData);
            sandbox.stub(mockedDatastore, 'get').resolves(fixtures.JwtTokenEntity);

            authService.logout(fixtures.jwtToken)
                .then(() => {
                    done();
                })
                .catch(err => {
                    assert.fail(err.message);
                    done();
                });
        });

    });

});
