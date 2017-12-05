'use strict';

var $ = module.exports;

/**
 Returns formatted name for a given route's path
 @param route
 **/
$.resolveRouteName = function(route) {
    if (route && route.path) {
        route = (typeof route.path === 'object') ? route.path[0] : route.path;

        // splitting and joining is faster than replacing: http://jsperf.com/replace-all-vs-split-join
        route = route.split(':').join('');
        route = route.split('/').join('_');

        // tidy up the start of the route name
        if (route[0] === '_' || route[0] === '.') {
            route = route.slice(1);
        }

        // tidy up the end of the route name
        var lastChar = route.length - 1;
        if (route[lastChar] === '_' || route[lastChar] === '.') {
            route = route.slice(0, -1);
        }

    } else {
        route = 'no_route';
    }

    return route;
};

