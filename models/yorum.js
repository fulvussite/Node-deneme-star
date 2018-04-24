var mongoose = require("mongoose");

var yorumSchema = new mongoose.Schema({
	text		: String,
	date: {type:Date, default: Date.now},
	yazar		: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});
module.exports = mongoose.model("Yorum", yorumSchema);