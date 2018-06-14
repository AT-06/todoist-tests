// Let's load the default configs:
let defaults = require("./wdio.conf.js").config;
let configure = require('./config.json');
var _ = require("lodash");

var overrides = {
    services: ['sauce'],
    user: configure.sauceUserName,
    key: configure.sauceKEY,
    sauceConnect: true,
    capabilities: [{
        browserName: configure.browserName,
        platform: configure.platform,
        version: configure.version,
        screenResolution: '1024x768'

    }]
};

// Send the merged defaults to wdio
exports.config = _.defaultsDeep(overrides, defaults);
