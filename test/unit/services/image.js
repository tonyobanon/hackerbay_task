'use strict';

let assert = require('chai').assert;

let fixtures = require('test/fixtures/services/image');

let mocks = require('test/helpers/mocks');

let mockedConfig = mocks.mockedConfig;
let mockedLogger = mocks.mockedLogger;
let mockedMetrics = mocks.mockedMetrics;

let errors = require('app/errors');

let ImageService = require('app/services/image');
let imageService;

describe('ImageService', () => {

    before(() => {
        imageService = new ImageService(mockedConfig, mockedLogger, mockedMetrics);
    });

    describe('.generateThumbnail', () => {

        it('should return a the corresponding 50 x 50 image buffer for the given imageURL', function(done) {

            this.timeout(25000);

            imageService.generateThumbnail(fixtures.imageURL)
                .then((buffer) => {
                    assert.strictEqual(buffer.toString('base64'), fixtures.base64Image);
                })
                .catch(err => {
                    assert.fail(err.message);
                })
                .then(() => {
                    done();
                });

        });

        it('should throw error if the image URL returns a non-200 response code', function(done) {

            this.timeout(25000);

            imageService.generateThumbnail(fixtures.fakemageURL)
                .then(() => {
                    assert.fail(`should fail because a non-200 response`);
                })
                .catch(err => {
                    if (err instanceof errors.ResourceFetchError) {
                        assert.ok(err);
                    } else {
                        assert.fail('Unknown error was thrown');
                    }
                })
                .then(() => {
                    done();
                });
        });

    });

});
