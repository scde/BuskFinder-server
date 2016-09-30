var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var BuskEventSchema = new Schema({
    artistName: String,
    genre: String,
    description: String,
    password: String,
    latitude: Number,
    longitude: Number,
    placeName: String,
    placeAddress: String,
    fromTime: Number,
    toTime: Number,
    picture: String
});

BuskEventSchema.virtual("date")
.get(function(){
    return this._id.getTimestamp();
});

mongoose.model("BuskEvent", BuskEventSchema);
