'use strict';

let jsonpatch = require('jsonpatch');

let errors = require('../errors');
let httpStatus = require('http-status');

class JsonPatchController {

    /**=
     * @param {logging} logging Instance of logging
     * @param {Metrics} metrics Instance of metrics
     */
    constructor(logging, metrics) {

        this.logging = logging;
        this.metrics = metrics;
    }

    /**
     * Endpoint to simply patch json data.
     *
     * @param  {Request}  req  The http request object
     * @param  {Response} res  The http response object
     * @param  {Function} next Callback to indicate that the next middleware can be initiated
     */
    patchJson(req, res, next) {

        let original = req.body.original;
        let patch = req.body.patch;

        //Try to decode params to JSON, if necessary
        try {
            if (original.constructor.name === 'String') {
                original = JSON.parse(original);
            }

            if (patch.constructor.name === 'String') {
                patch = JSON.parse(patch);
            }
        }catch (e) {
            //Invalid syntax
            res.send(httpStatus.BAD_REQUEST, new errors.InvalidParams());
            return next();
        }

        //Performs extra validation on the object(s)

        if (!this._validateParams(original, patch)) {
            res.send(httpStatus.BAD_REQUEST, new errors.InvalidParams());
            return next();
        }

        this.metrics.increment('json_path.request.patch');

        let patchedObject = jsonpatch.apply_patch(original, patch);

        this.metrics.increment('json_path.response.patch.ok');

        res.contentType = 'application/json';
        res.send(httpStatus.OK, patchedObject);

        return next();
    }

    _validateParams(original, patch) {

        if (!(original instanceof Object && patch instanceof Array)) {
            return false;
        }

        if (!(Object.keys(original).length && patch.length)) {
            return false;
        }

        for (let i in patch) {
            let entry = patch[i];
            if (!(entry.op && entry.path && entry.value)) {
                return false;
            }
        }

        return true;
    }

}

module.exports = JsonPatchController;
