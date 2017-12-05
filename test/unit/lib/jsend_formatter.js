'use strict';

var expect      = require('chai').expect;
var formatter   = require('app/lib/jsend_formatter');
var createError = require('custom-error-generator');

// stub of the request being provided to the formatter
var request  = {};

// stub of the response being provided to the formatter
var response = {
    header: function() {}
};

describe('JSend formatter', function() {

    it('jsend error response returned when error is sent', function(done) {
        var HelloWorldError = createError('HelloWorldError', {code: 'HELLO_WORLD'});
        formatter(request, response, new HelloWorldError('Hello World'), function(error, result) {
            expect(typeof result).to.equal('string');

            // attempt to parse the string as json
            var resultObj = JSON.parse(result);

            // assert we have
            expect(resultObj.status).to.equal('error');
            expect(resultObj.message).to.equal('Hello World');
            expect(resultObj.code).to.equal('HELLO_WORLD');
            done();
        });
    });

    it('jsend success response when object is sent', function(done) {
        var packet  = {
            test: 'test me',
            hello: 'world'
        };

        formatter(request, response, packet, function(error, result) {
            expect(typeof result).to.equal('string');

            // attempt to parse the string as json
            var resultObj = JSON.parse(result);

            expect(resultObj.status).to.equal('success');
            expect(resultObj.data.test).to.equal('test me');
            expect(resultObj.data.hello).to.equal('world');
            done();
        });
    });

    it('returns data when used by Restify 3', function(done) {
        var packet  = {
            test: 'test me',
            hello: 'world'
        };

        var result = formatter(request, response, packet);

        expect(typeof result).to.equal('string');

        // attempt to parse the string as json
        var resultObj = JSON.parse(result);

        expect(resultObj.status).to.equal('success');
        expect(resultObj.data.test).to.equal('test me');
        expect(resultObj.data.hello).to.equal('world');
        done();
    });

    it('jsend error response returned when error is sent with default error message', function(done) {
        var HelloWorldError = createError('HelloWorldError', {code: 'HELLO_WORLD', defaultMessage: 'Default error'});
        formatter(request, response, new HelloWorldError(), function(error, result) {
            expect(typeof result).to.equal('string');

            // attempt to parse the string as json
            var resultObj = JSON.parse(result);

            // assert we have
            expect(resultObj.status).to.equal('error');
            expect(resultObj.message).to.equal('Default error');
            expect(resultObj.code).to.equal('HELLO_WORLD');
            done();
        });
    });
});
