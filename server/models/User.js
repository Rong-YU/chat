const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	nickname: { type: String },
	username: { type: String, unique: true, require: true },
	password: { type: String, require: true },
	sessionKey: { type: String },
	joinedRoom: [
		{ type: mongoose.SchemaTypes.ObjectId, ref: "Room", default: null },
	],
})

module.exports = mongoose.model("User", schema)
