'use strict';

let errors = require('../errors');
let httpStatus = require('http-status');
const fileType = require('file-type');

class ImageController {

    /**
     * @param imageService Image Service instance
     * @param {logging} logging Instance of logging
     * @param {Metrics} metrics Instance of metrics
     */
    constructor(logging, metrics, imageService) {

        this.logging = logging;
        this.metrics = metrics;
        this.imageService = imageService;
    }

    /**
     * Endpoint to allow users generate a thumbnail, given a publicly accessible image URL
     * their session.
     * @param  {Request}  req  The http request object
     * @param  {Response} res  The http response object
     * @param  {Function} next Callback to indicate that the next middleware can be initiated
     */
    generateThumbnail(req, res, next) {

        let imageURL = req.params.imageURL;

        if (!/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/.test(imageURL)) {
            //Invalid URI format
            res.send(httpStatus.BAD_REQUEST, new errors.InvalidParams());
            return next();
        }

        this.metrics.increment('images.request.generate_thumbnail');

        this.imageService.generateThumbnail(imageURL)
            .then((buf) => {

                this.metrics.increment('images.response.generate_thumbnail.ok');

                res.contentType = fileType(buf);
                res.end(buf);
            })
            .catch((err) => {

                this.metrics.increment('images.response.generate_thumbnail.error.internal_error');

                res.send(httpStatus.BAD_REQUEST, err);
                return next();
            });
    }
}

module.exports = ImageController;
