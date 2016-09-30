var path = require("path"),
    rootPath = path.normalize(__dirname + "/.."),
    env = process.env.NODE_ENV || "development";

var config = {
    development: {
        root: rootPath,
        app: {
            name: "buskfinder"
        },
        port: process.env.PORT || 3000,
        db: "mongodb://localhost/buskfinder-development"
    },

    test: {
        root: rootPath,
        app: {
            name: "buskfinder"
        },
        port: process.env.PORT || 3000,
        db: "mongodb://localhost/buskfinder-test"
    },

    production: {
        root: rootPath,
        app: {
            name: "buskfinder"
        },
        port: process.env.PORT || 3000,
        db: "mongodb://localhost/buskfinder-production"
    }
};

module.exports = config[env];
