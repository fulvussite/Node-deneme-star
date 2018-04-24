const mongoose = require("mongoose");

var gameSchmea = new mongoose.Schema({

    title: String,
    image: String,
    content: String,
    icerik: String,
    date: {type:Date, default: Date.now},
  

});

module.exports = mongoose.model("game", gameSchmea);