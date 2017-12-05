'use strict';

let joi            = require('joi');

let mocks = require('test/helpers/mocks');
let mockedConfig = mocks.mockedConfig;
let mockedLogger = mocks.mockedLogger;

let fixtures = require('test/fixtures/controllers/auth_controller');

let server    = require('server');
let request   = require('supertest')(server);

let Datastore = require('app/lib/data_store');
let datastore = new Datastore(mockedConfig, mockedLogger);

describe('Auth Controller', () => {

    beforeEach(() => {
        datastore.clear();
        datastore.save('jwt_tokens', fixtures.JwtTokenEntity.id, fixtures.JwtTokenEntity);
    });

    describe('.login', () => {
        it('should return a jwt token, if a username and password is sent in the request', (done) => {
            request.post(`/v1/auth/login`)
                .field('username', 'superuser')
                .field('password', 'p@55w0rd')
                .expect(200)
                .expect(res => {
                    let schema = {
                        jwt_token: joi.string().required(),
                        timestamp: joi.number().required()
                    };
                    joi.assert(res.body.data, schema);
                })
                .end(done);
        });
    });

    describe('.logout', () => {
        it('should return a jwt token, if a username and password is sent in the request', (done) => {
            request.post(`/v1/auth/logout`)
                .field('jwt_token', fixtures.jwtToken)
                .expect(200)
                .expect(res => {
                    let schema = {
                        timestamp: joi.number().required()
                    };
                    joi.assert(res.body.data, schema);
                })
                .end(done);
        });
    });
});
