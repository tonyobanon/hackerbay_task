'use strict';

let assert = require('chai').assert;

let mocks = require('test/helpers/mocks');
let mockedConfig = mocks.mockedConfig;
let mockedLogger = mocks.mockedLogger;

let fixtures = require('test/fixtures/controllers/image_controller');

let server    = require('server');
let request   = require('supertest')(server);

let Datastore = require('app/lib/data_store');
let datastore = new Datastore(mockedConfig, mockedLogger);

describe('Image Controller', () => {

    beforeEach(() => {
        datastore.clear();
        datastore.save('jwt_tokens', fixtures.JwtTokenEntity.id, fixtures.JwtTokenEntity);

    });

    it('should successfully return an image', function(done) {
        this.timeout(25000);

        request.get(`/v1/protected/image/resize?imageURL=${fixtures.imageURL}`)
            .set(`authorization`, `Bearer ${fixtures.jwtToken}`)
            .expect(200)
            .expect(res => {
                assert.isOk(res.body);
            })
            .end(done);
    });

    it('should return a 404 http status error', function(done) {
        this.timeout(10000);

        request.get(`/v1/protected/image/resize?imageURL=${fixtures.invalidimageURL}`)
            .set(`authorization`, `Bearer ${fixtures.jwtToken}`)
            .expect(400)
            .end(done);
    });

});
