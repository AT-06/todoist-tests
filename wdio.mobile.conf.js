// Let's load the default configs:
var defaults = require("./wdio.conf.js").config;
var _ = require("lodash");
const ResponsiveService = require('wdio-responsive-service/lib/responsive-service');

var overrides = {
    capabilities: ResponsiveService.buildCapabilities(
        [
            {
                browserName: 'chrome'
            }
        ],
        [
            {
                width: 480,
                height: 640
            }
        ]
    ),
    // ...
    services: ['responsive'],
};

// Send the merged config to wdio
exports.config = _.defaultsDeep(overrides, defaults);