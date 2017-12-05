'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var mockery = require('mockery');

let mocks = require('test/helpers/mocks');
let mockedMetrics = mocks.mockedMetrics;

// stub out date+time
var clock = sinon.useFakeTimers(new Date(2015, 1, 2, 3, 4, 5, 0).getTime());

// stub out onHeaders
mockery.enable({
    warnOnReplace: false,
    warnOnUnregistered: false
});

var onHeadersMock = function(res, callback) {
    // re-stub the date+time causing a 987ms difference
    clock = sinon.useFakeTimers(new Date(2015, 1, 2, 3, 4, 5, 987).getTime());

    callback();
};

mockery.registerMock('on-headers', onHeadersMock);

var RouteStats = require('app/lib/routestats');

var resolveRoutes = function() {
    return 'fakeRouteName';
};

describe('RouteStats', function() {

    describe('constructor', function() {

        it('requires a statsD client object', function() {
            expect(function() {
                new RouteStats();
            }).to.throw(Error, 'No StatsD client provided.');
        });

        it('allows a "resolveRouteName" method to be provided', function() {
            var routestats = new RouteStats(mockedMetrics, function() {
                return 'hello world';
            });

            expect(routestats.resolveRouteName('fakeValue')).to.equal('hello world');
        });

        it('uses a default "resolveRouteName" method if one is not provided', function() {
            var routestats = new RouteStats(mockedMetrics);
            expect(routestats.resolveRouteName({ name: 'mocked_route_name' })).to.equal('mocked_route_name');
        });

        it('default "resolveRouteName" method returns "unnamed" if the route does not have a name', function() {
            var routestats = new RouteStats(mockedMetrics);
            expect(routestats.resolveRouteName({})).to.equal('unnamed');
        });

        it('does not throw an error when necessary values are given', function() {
            expect(function() {
                new RouteStats(mockedMetrics, resolveRoutes);
            }).to.not.throw(Error);
        });

        it('sets all values on to the object', function() {
            var routestats = new RouteStats(mockedMetrics, resolveRoutes);
            expect(typeof routestats.statsdClient).to.equal('object');
            expect(typeof routestats.resolveRouteName).to.equal('function');
            expect(typeof routestats.onHeaders).to.equal('function');
        });

        it('allows "keyTemplates" to be overwritten', function() {

            var newKeyTemplates = {
                routeTiming: 'testKey1',
                routeTotalCount: 'testKey2',
                fakeKey1: 'testKey3'
            };

            var expected = {
                routeTiming: newKeyTemplates.routeTiming,
                routeStatusCode: 'request.%route%.http_status.%responseCode%',
                routeTotalCount: newKeyTemplates.routeTotalCount,
                appTotalCount: 'request.total'
            };

            // with a custom route name resolver
            var routerstats = new RouteStats(mockedMetrics, resolveRoutes, newKeyTemplates);
            expect(JSON.stringify(routerstats.keyTemplates)).to.equal(JSON.stringify(expected));

            // without custom route name resolver
            routerstats = new RouteStats(mockedMetrics, undefined, newKeyTemplates);
            expect(JSON.stringify(routerstats.keyTemplates)).to.equal(JSON.stringify(expected));
        });
    });

});
