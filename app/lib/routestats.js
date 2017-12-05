'use strict';

/**
 * Instantiates a new RouteStats object
 *
 * Errors will be thrown if any required parameters are not provided.
 *
 * @param statsdClient                   StatsD client instance
 * @param resolveRouteName       optional function for resolving route path names
 * @param keyTemplatesOverrides  optional overrides for stat keys, see "keyTemplates" below
 *
 * @constructor
 */
function RouteStats(statsdClient, resolveRouteName, keyTemplatesOverrides) {
    if (!statsdClient || (typeof statsdClient !== 'object')) {
        throw new Error('No StatsD client provided.');
    }

    // default keys for stats
    this.keyTemplates = {
        routeTiming:     'request.%route%',
        routeStatusCode: 'request.%route%.http_status.%responseCode%',
        routeTotalCount: 'request.%route%',
        appTotalCount:   'request.total',
    };

    // if overrides are present, use them
    if (keyTemplatesOverrides) {
        for (var key in this.keyTemplates) {
            if (keyTemplatesOverrides[key]) {
                this.keyTemplates[key] = keyTemplatesOverrides[key];
            }
        }
    }

    this.statsdClient = statsdClient;

    // if a "resolveRouteName" method is provided, use that
    if (resolveRouteName && (typeof resolveRouteName === 'function')) {
        this.resolveRouteName = resolveRouteName;

    // otherwise just default to returning the route name (if present)
    } else {
        this.resolveRouteName = function(route) { return (route && route.name) ? route.name : 'unnamed'; };
    }

    // this library allows us to hook headers being sent (ie: the end of the request+response)
    this.onHeaders = require('on-headers');
}

/**
 * Records stats for a route
 *
 * @param req   the request
 * @param res   the response
 * @param next
 */
RouteStats.prototype.record = function(req, res) {

    var start = new Date().getTime();

    // scope is about to change
    var _this = this;

    _this.onHeaders(res, function() {
        var time = new Date().getTime() - start;
        var routeName = 'routename_unset_or_error';

        // avoid outside code causing an error
        try {
            routeName = _this.resolveRouteName(req.route);
        } catch (e) {
            // do nothing
        }

        // translate key templates and send out stats
        // splitting and joining is faster than string replacing: http://jsperf.com/replace-all-vs-split-join

        // time taken for route
        _this.statsdClient.timing(
            _this.keyTemplates.routeTiming.split('%route%').join(routeName),
            time
        );

        // sum of response codes for the route
        _this.statsdClient.increment(
            _this.keyTemplates.routeStatusCode
                .split('%route%').join(routeName)
                .split('%responseCode%').join(res.statusCode)
        );

        // sum of total calls to this route
        _this.statsdClient.increment(
            _this.keyTemplates.routeTotalCount.split('%route%').join(routeName)
        );

        // sum of total calls to the application
        _this.statsdClient.increment(_this.keyTemplates.appTotalCount);

    });
};

module.exports = RouteStats;
