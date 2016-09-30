var path = require("path"),
    rootPath = path.normalize(__dirname + "/.."),
    env = process.env.NODE_ENV || "development";

var config = {
    development: {
        root: rootPath,
        app: {
            name: "buskfinder"
        },
        port: process.env.PORT || 61088,
        db: "mongodb://androids_mongoadmin:fox9aecaiZ@localhost:21257/buskfinder-development"
    },

    test: {
        root: rootPath,
        app: {
            name: "buskfinder"
        },
        port: process.env.PORT || 64671,
        db: "mongodb://androids_mongoadmin:fox9aecaiZ@localhost:21257/buskfinder-test"
    },

    production: {
        root: rootPath,
        app: {
            name: "buskfinder"
        },
        port: process.env.PORT || 61088,
        db: "mongodb://androids_mongoadmin:fox9aecaiZ@localhost:21257/buskfinder-production"
    }
};

module.exports = config[env];
