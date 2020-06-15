const User = require("../models/User")
const Room = require("../models/Room")
const Message = require("../models/Message")

module.exports = (app) => {
	app.post("/api/room", async (req, res) => {
		if (req.body.title) {
			const items = await Room.create({
				title: req.body.title,
				creator: req.user,
				password: req.body.password,
			})
			await req.user.updateOne({
				$addToSet: { joinedRoom: items },
			})
			return res.send(items)
		}
		return res.sendStatus(400)
	})
	app.get("/api/room", async (req, res) => {
		const items = await Room.find()
		return res.send(items)
	})
	app.get("/api/room/:id", async (req, res) => {
		const items = await Room.findById(req.params.id).populate(
			"messages user"
		)

		return res.send(items)
	})
	app.get("/api/myroom", async (req, res) => {
		const items = await User.findOne(req.user).populate(
			"joinedRoom",
			"title"
		)
		return res.send(items.joinedRoom)
	})

	app.delete("/api/room/:id", async (req, res) => {
		const room = await Room.findById(req.params.id)
		if (room) {
			if (req.user._id.equals(room.creator._id)) {
				room.remove()
				return res.sendStatus(200)
			}
			return res.sendStatus(400)
		}
		return res.sendStatus(400)
	})

	app.post("/api/join/:id", async (req, res) => {
		const room = await Room.findById(req.params.id)
		console.log("已经加入的房间", req.user.joinedRoom)
		if (room && !req.user.joinedRoom.includes(req.params.id)) {
			console.log("未加入")
			if (room.password) {
				if (!req.body.password || req.body.password !== room.password) {
					return res.sendStatus(400)
				}
			}
			await req.user.update({
				$addToSet: { joinedRoom: req.params.id },
			})
			await room.update({
				$addToSet: { users: req.user },
			})
			return res.sendStatus(200)
		}
		return res.sendStatus(400)
	})

	app.post("/api/leave/:id", async (req, res) => {
		console.log("im out!")
		const room = await Room.findById(req.params.id)
		if (room && room in req.user.joinedRoom) {
			console.log("有房间，且已加入")
			await req.user.update({
				$pull: { joinedRoom: req.params.id },
			})
			await room.update({
				$pull: { users: req.user },
			})
			return res.sendStatus(200)
		}
		return res.sendStatus(400)
	})

	app.get("api/room", async (req, res) => {
		const room = await Room.findById(req.params.id)
		if (room) {
			return res.send(room.messages)
		}
		return res.sendStatus(400)
	})
}
