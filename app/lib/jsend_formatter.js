'use strict';

/**
 * JSON formatter.
 * @public
 * @function formatJSON
 * @param    {Object} req  the request object
 * @param    {Object} res  the response object
 * @param    {Object} body response body
 * @returns  {String}
 */
function formatJSend(req, res, body, cb) {
    var packet = {};

    cb = cb || function(error, result) {
        return result;
    };

    if (body instanceof Error) {

        // handle errors responses
        packet.status  = 'error';
        packet.message = (body.message === '' && body.defaultMessage) ? body.defaultMessage : body.message;

        // add the error code if it is available
        if (body.code !== undefined) {
            packet.code = body.code;
        }

    } else {
        // handle success responses
        packet = {
            status: 'success',
            data: body
        };
    }

    var data = JSON.stringify(packet);
    res.header('Content-Length', Buffer.byteLength(data));

    return cb(null, data);
}

module.exports = formatJSend;
