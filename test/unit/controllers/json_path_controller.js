'use strict';

let assert = require('chai').assert;

let mocks = require('test/helpers/mocks');
let mockedConfig = mocks.mockedConfig;
let mockedLogger = mocks.mockedLogger;

let fixtures = require('test/fixtures/controllers/json_path_controller');

let server    = require('server');
let request   = require('supertest')(server);

let Datastore = require('app/lib/data_store');
let datastore = new Datastore(mockedConfig, mockedLogger);

describe('Json Patch Controller', () => {

    beforeEach(() => {
        datastore.clear();
        datastore.save('jwt_tokens', fixtures.JwtTokenEntity.id, fixtures.JwtTokenEntity);
    });

    it('should successfully perform json patching', (done) => {

        request.post(`/v1/protected/json/patch`)
            .set(`authorization`, `Bearer ${fixtures.jwtToken}`)
            .field('original', JSON.stringify(fixtures.originalJson))
            .field('patch', JSON.stringify(fixtures.pathJson))
            .expect(200)
                .expect(res => {
                    assert.deepEqual(res.body.data, fixtures.jsonPatchResponse);
                })
                .end(done);
    });

    it('should return a 400 error, if the parameters are not formatted properly', (done) => {

        request.post(`/v1/protected/json/patch`)
            .set(`authorization`, `Bearer ${fixtures.jwtToken}`)
            .field('original', 'p@55w0rd')
            .field('patch', 'p@55w0rd')
            .expect(400)
            .end(done);
    });

});
