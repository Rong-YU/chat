const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", default: null },
	nickname: { type: String },
	content: { type: String },
	createAt: { type: Date, default: Date.now },
	room: { type: mongoose.SchemaTypes.ObjectId, ref: "Room", default: null },
})

module.exports = mongoose.model("Message", schema)
