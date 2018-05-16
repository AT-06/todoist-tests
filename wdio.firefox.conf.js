// Let's load the default configs:
var defaults = require("./wdio.conf.js").config;
var _ = require("lodash");

var overrides = {
    capabilities: [{
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        browserName: 'firefox'
    }]
};

// Send the merged config to wdio
exports.config = _.defaultsDeep(overrides, defaults);
