'use strict';

var expect = require('chai').expect;
var locator = require('app/lib/service_locator');

describe('Service Locator', function() {

    beforeEach(() => {
        locator.clear();
    });

    it('clears all dependencies when the clear method gets called', function(done) {

        locator.register('test', function() {
            return {
                test: 'test01'
            };
        });

        var dependenciesBeforeClear = locator.getAll();
        expect(Object.keys(dependenciesBeforeClear).length).to.equal(1);

        locator.clear();

        var dependenciesAfterClear = locator.getAll();
        expect(Object.keys(dependenciesAfterClear).length).to.equal(0);

        done();
    });

    it('successfully returns an instance of a registered dependency', function(done) {
        locator.register('test', function(dic) {
            try {
                expect(dic).to.not.equal(null);
                expect(dic).to.not.equal(undefined);
            } catch (err) {
                done(err);
            }

            return {
                hello: 'world'
            };
        });

        var test = locator.get('test');

        expect(test).to.not.equal(null);
        expect(test).to.not.equal(undefined);
        expect(test.hello).to.equal('world');

        locator.clear();

        done();
    });

    it('is able to return all dependencies in the service locator', function(done) {
        locator.register('test1', function() {
            return {
                hello: 'John'
            };
        });

        locator.register('test2', function() {
            return {
                hello: 'Mary'
            };
        });

        var dependencies = locator.getAll();

        // expect an object with the dependency name as the key and the resolved
        // dependancy as the value
        expect(typeof dependencies).to.equal('object');
        expect(Object.keys(dependencies).length).to.equal(2);
        expect(dependencies.test1.hello).to.equal('John');
        expect(dependencies.test2.hello).to.equal('Mary');

        locator.clear();

        done();
    });

    it('errors when attempting to add a constructor that is not of type function', function(done) {
        try {
            locator.register('test', 'Not a function');
            done(
                new Error('Expected an error to be thrown')
            );
        } catch (err) {
            expect(err instanceof Error).to.equal(true);
            done();
        }

    });

});
