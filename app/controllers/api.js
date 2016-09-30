var express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    BuskEvent = mongoose.model("BuskEvent"),
    bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

module.exports = function (app) {
    app.use("/", router);
};

router.get("/", function (req, res, next) {
    BuskEvent.find(function (err, buskEvents) {
        if (err) {
            return next(err);
        }
        return res.json(buskEvents);
    })
    .select("-password -__v");
})
.post("/", function (req, res, next) {
    var newEvent = req.body;

    if (newEvent) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(newEvent.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                newEvent.password = hash;
                new BuskEvent(newEvent).save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    console.log(newEvent);
                    return res.status(200).send({ response: "OK" });
                });
            });
        });
    }
    else {
        next()
    }
})
.put("/", function (req, res, next) {
    var deleteEvent = req.body;

    if (deleteEvent) {
        deleteEvent._id = mongoose.Types.ObjectId(deleteEvent._id);
        BuskEvent.findOne(deleteEvent._id, function (err, buskEvent) {
            if (err) {
                return next(err);
            }
            bcrypt.compare(deleteEvent.password, buskEvent.password,
                    function (err, isMatch) {
                if (err) {
                    return next(err);
                }
                console.log("DELETE: " + isMatch);
                if (isMatch) {
                    BuskEvent.findByIdAndRemove(deleteEvent._id,
                            function (err, deletedEvent) {
                        if (err) {
                            return next(err);
                        }
                        return res.status(200).send({ response: "OK" });
                    });
                }
                else {
                    return next();
                }
            });
        });
    }
    else {
        next();
    }
});
