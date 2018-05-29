// Docker configs:
var defaults = require("./wdio.conf.js").config;
var _ = require("lodash");

var overrides = {
    services: ['docker'],

    dockerOptions: {
        image: 'selenium/standalone-chrome',
        healthCheck: 'http://10.28.109.106:4444/wd/hub',
        options: {
            p: ['4444:4700'],
            shmSize: '2g'
        }
    }
};

// Send the merged config to wdio
exports.config = _.defaultsDeep(overrides, defaults);