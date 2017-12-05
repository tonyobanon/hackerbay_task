'use strict';

let httpStatus = require('http-status');
const fetch = require('node-fetch');
const errors = require('../errors');

const Jimp = require('jimp');
/**
 * Image Service.
 *
 * This class performs Image Resizing
 */
class ImageService {

    /**
     * Class constructor
     *
     * @constructor
     */
    constructor(config, logger, metrics) {
        this.config = config;
        this.logger = logger;
        this.metrics = metrics;
    }

    /**
     * Generate Thumbnail.
     *
     * @param  {String} imageURL The url of the public image
     *
     * @return {Promise} The processed image
     */
    generateThumbnail(imageURL) {

        return new Promise((resolve, reject) => {

            fetch(imageURL, {timeout: 10000})

                .then(function(res) {

                    if (res.status !== httpStatus.OK) {
                        return Promise.reject(errors.ResourceFetchError(res.statusText));
                    }

                    return res.buffer();
                })

                .then((buffer) => {

                    let logger = this.logger;

                    logger.debug(`Reading image from ${imageURL}`);
                    Jimp.read(buffer, function(err, image) {

                        if (err) {
                            return Promise.reject(errors.InternalServerError(err.message));
                        }

                        logger.debug(`Resizing image`);
                        image.resize(50, 50, Jimp.RESIZE_BEZIER);

                        logger.debug(`Buffering image`);
                        image.getBuffer(image.getMIME(), function(err, buffer) {

                            if (err) {
                                return Promise.reject(errors.InternalServerError(err.message));
                            }

                            logger.debug(`Image resize complete`);
                            resolve(buffer);
                        });
                    });

                })

                .catch(function(err) {
                    //Finally, call reject(..)
                    reject(errors.ResourceFetchError(err.message));
                });
        });
    }

}

module.exports = ImageService;
