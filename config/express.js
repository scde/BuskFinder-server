var express = require("express");
var glob = require("glob");

var logger = require("morgan");
var bodyParser = require("body-parser");
var compress = require("compression");

module.exports = function(app, config) {
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(compress());

    var controllers = glob.sync(config.root + "/app/controllers/*.js");
    controllers.forEach(function (controller) {
        require(controller)(app);
    });

    app.use(function (req, res, next) {
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(err.status || 500).send({ error: err.message });
    });
};
