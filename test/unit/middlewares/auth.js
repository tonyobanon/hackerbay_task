'use strict';

let mocks = require('test/helpers/mocks');
let mockedConfig = mocks.mockedConfig;
let mockedLogger = mocks.mockedLogger;

let fixtures = require('test/fixtures/middleware/auth');

let server    = require('server');
let request   = require('supertest')(server);

let Datastore = require('app/lib/data_store');
let datastore = new Datastore(mockedConfig, mockedLogger);

describe('Auth middleware', () => {

    beforeEach(() => {
        datastore.clear();
        datastore.save('jwt_tokens', fixtures.JwtTokenEntity.id, fixtures.JwtTokenEntity);
    });

    it('should succeed if a valid jwt token is included as part of the request query', (done) => {
        request.get(`/v1/protected/ping?token=${fixtures.jwtToken}`)
            .expect(200)
            .end(done);
    });

    it('should succeed if a valid jwt token is included as part of the request headers', (done) => {
        request.get(`/v1/protected/ping`)
            .set(`authorization`, `Bearer ${fixtures.jwtToken}`)
            .expect(200)
            .end(done);
    });

    it('should fail if no valid jwt token was included in the request', (done) => {
        request.get(`/v1/protected/ping`)
            .expect(403)
            .end(done);
    });

});
