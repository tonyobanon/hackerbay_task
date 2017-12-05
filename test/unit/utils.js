'use strict';

var expect = require('chai').expect;
var utils = require('app/utils');

describe('Utils', function() {

    describe('.resolveRouteName', () => {

        it('Should return a properly formatted route name', function(done) {

            let mockedRoute = {
                path: '_https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg.'
            };

            let routeName = utils.resolveRouteName(mockedRoute);
            let expected = 'https__upload.wikimedia.org_wikipedia_commons_3_36_Hopetoun_falls.jpg';

            expect(routeName).to.equal(expected);
            done();
        });

        it('Should return "no_route" if no path was specified', function(done) {
            let routeName = utils.resolveRouteName({});
            expect(routeName).to.equal('no_route');
            done();
        });

    });

});
