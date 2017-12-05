'use strict';

var sinon   = require('sinon');
var expect  = require('chai').expect;
var mockery = require('mockery');

let mocks = require('test/helpers/mocks');
let mockedLogger = mocks.mockedLogger;

var sandbox = sinon.sandbox.create();

mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
});

// fake joi object
var joiMock = {
    validate: function() {
        return true;
    }
};

// fake joi object
var failJoiMock = {
    meh: {},
    validate: function() {
        return {
            error: {
                details: [
                    'fake error message'
                ]
            }
        };
    }
};

// fake request object
var request = {
    body: {
    },
    route: {
        validation: {
            body: {
                email: null
            }
        }
    }
};

var badRequest = {
    route: {
        validation: {
            fakeProperty: {

            }
        }
    }
};

//fake response object
var response = {
    status: function() {},

    send: function() {}
};

// mock callback
var next;

var validationMiddleware     = require('app/lib/validation').paramValidation(joiMock, mockedLogger, {});
var validationMiddlewareFail = require('app/lib/validation').paramValidation(failJoiMock, mockedLogger, {});

describe('Parameter Validation Middleware', function() {

    beforeEach(function() {
        next = sandbox.stub();
    });

    afterEach(function() {
        // remove any spies and stubbed methods
        sandbox.restore();
    });

    describe('next called', function() {

        afterEach(function() {
            expect(next.called).to.equal(true);
        });

        it('validate with no properties', function() {

            sandbox.stub(request.route, 'validation', undefined);

            validationMiddleware(request, response, next);
        });

        it('validate with supported property', function() {

            sandbox.stub(request.route.validation.body, 'email', joiMock);

            validationMiddleware(request, response, next);
        });

    });

    describe('next not called', function() {

        afterEach(function() {
            expect(next.called).to.equal(false);
        });

        it('validate with unsupported property', function() {

            expect(function() {
                validationMiddleware(badRequest, response, next);
            }).to.throw('An unsupported validation key was set in route');
        });

        it('failed validation', function() {

            sandbox.stub(request.route.validation.body, 'email', failJoiMock);

            validationMiddlewareFail(request, response, next);
        });

        it('validate with empty body', function() {

            sandbox.stub(request, 'body', undefined);

            validationMiddleware(request, response, next);
        });

    });
});
