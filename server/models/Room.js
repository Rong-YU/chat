const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	creator: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User",
		default: null,
	},
	title: { type: String },
	users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
	password: { type: String, default: null },
	messages: [
		{ type: mongoose.SchemaTypes.ObjectId, ref: "Message", default: null },
	],
	bannedUser: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
})
schema.pre("save", function (next) {
	console.log("setting creator")
	this.users.push(this.creator)
	next()
})

schema.pre("remove", async function () {
	console.log("remove!")
	const User = mongoose.model("User")
	const items = await User.find({ _id: { $in: this.users } }).update(
		{},
		{ $pull: { joinedRoom: this._id } },
		{ multi: true }
	)
	console.log(items)
})

module.exports = mongoose.model("Room", schema)
