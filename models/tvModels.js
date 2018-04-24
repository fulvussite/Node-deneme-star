const mongoose = require("mongoose");

var tvSchmea = new mongoose.Schema({

    title: String,
    image: String,
    content: String,
    icerik: String,
    date: {type:Date, default: Date.now},
   

});

module.exports = mongoose.model("tv", tvSchmea);