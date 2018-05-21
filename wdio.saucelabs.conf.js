// Let's load the default configs:
var defaults = require("./wdio.conf.js").config;
var _ = require("lodash");

var overrides = {
    services: ['sauce'],
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    sauceConnect: true
};

// Send the merged config to wdio
exports.config = _.defaultsDeep(overrides, defaults);
