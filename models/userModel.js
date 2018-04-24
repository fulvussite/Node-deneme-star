const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    yorumlar	:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Yorum"
    }]
});    

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);