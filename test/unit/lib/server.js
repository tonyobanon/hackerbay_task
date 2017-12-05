'use strict';

let joi            = require('joi');

let logHelper      = require('test/helpers/logging_mock');
logHelper.mock();

var sinon = require('sinon');
let sandbox = sinon.sandbox.create();

let server    = require('server');
let request   = require('supertest')(server);

describe('General endpoint handling', () => {

    afterEach(() => {
        // completely restore all fakes created through the sandbox
        sandbox.restore();
    });

    it('Get a URL that does not exist', (done) => {

        request.get('/v1/meh')
            .expect('Content-type', 'application/json')
            .expect(404)
            .expect(res => {

                let schema = {
                    status: joi.string().valid('error').required(),
                    code: joi.string().valid('METHOD_NOT_IMPLEMENTED').required(),
                    message: joi.string().valid('Method not Implemented')
                };

                joi.assert(res.body, schema);
            })
            .end(done);
    });

    it('Get an invalid version', (done) => {

        request.get('/v9000/meh')
            .expect('Content-type', 'application/json')
            .expect(404)
            .expect(res => {
                let schema = {
                    status: joi.string().valid('error').required(),
                    code: joi.string().valid('VERSION_NOT_ALLOWED').required(),
                    message: joi.string().valid('Unsupported API version requested')
                };

                joi.assert(res.body, schema);
            })
            .end(done);
    });

    it('Use a method on an endpoint that is not allowed', (done) => {

        request.get('/v1/auth/login')
            .expect('Content-type', 'application/json')
            .expect(400)
            .expect(res => {
                let schema = {
                    status: joi.string().valid('error').required(),
                    code: joi.string().valid('METHOD_NOT_ALLOWED').required(),
                    message: joi.string().valid('Method not allowed')
                };

                joi.assert(res.body, schema);
            })
            .end(done);
    });

});
