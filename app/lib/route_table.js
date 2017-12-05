'use strict';

/**
@description Prints out a table of Restify routes
**/

module.exports =  function(routes) {
    var Table = require('cli-table');

    var table = new Table({
        style: {
            head: ['green'],
            compact: true
        },
        head: ['', 'Name', 'Path', 'Scope']
    });

    // vars used in loops below
    var row;
    var index;
    var path;
    var scope;
    var version;
    var val;

    let serviceLocator = require('../config/di');
    let logger = serviceLocator.get('logger');

    logger.info('APIs for this service:');

    for (var key in routes) {
        if (routes.hasOwnProperty(key)) {
            val = routes[key];

            // loop through the versions of this endpoint
            for (index in val.versions) {
                row = {};

                version = val.versions[index];

                // simplify the version number (if possible)
                // and avoid replacing ".0" in 1.0.2
                if (version.slice(-2) === '.0') {
                    version = version.replace(new RegExp('.0', 'g'), '');
                }

                path = '/v' + version + val.spec.path;
                scope = (val.spec.hasOwnProperty('scope')) ? val.spec.scope : 'n/a';
                row[val.method] = [val.name, path, scope];

                table.push(row);
            }
        }
    }

    logger.info('\n' + table.toString());

    return table;
};
