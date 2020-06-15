//authentication
module.exports = (app) => {
	const User = require("../models/User")
	const salt = "@#(fdas9dfjwoerjo!#)@#u09123sa1a#$"
	const crypto = require("crypto")

	app.use(async (req, res, next) => {
		req.header("Access-Control-Allow-Origin", "localhost:8080")
		req.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Authorization, Content-Type, Accept"
		)
		console.log("username", req.body.username)

		if (req.originalUrl.startsWith("/api/login") && req.method === "POST") {
			return next()
		}
		if (
			req.originalUrl.startsWith("/api/signup") &&
			req.method === "POST"
		) {
			return next()
		}

		if (req.headers.authorization) {
			//let sessionKey = req.headers.authorization
			let sessionKey = crypto
				.createHash("sha512")
				.update(req.headers.authorization)
				.digest("hex")
			user = await User.findOne({
				sessionKey,
			})
			if (user) {
				req.user = user
				return next()
			}
		}
		console.log("auth failed")
		return res.sendStatus(401)
	})

	app.post("/api/login", async (req, res) => {
		if (req.body.username && req.body.password) {
			let username = req.body.username.toString()
			let passwordHash = crypto
				.createHash("sha512")
				.update(req.body.password + salt)
				.digest("hex")

			let user = await User.findOne({
				username,
				password: passwordHash,
			})
			//.populate("joinedRoom", "title users")
			if (user) {
				let seed =
					Math.random() + "" + Math.random() + "" + Math.random()
				let session = crypto
					.createHash("sha512")
					.update(seed)
					.digest("hex")
				let sessionKey = crypto
					.createHash("sha512")
					.update(session)
					.digest("hex")
				await User.findOneAndUpdate(
					{ username },
					{ sessionKey: sessionKey }
				)
				return res.status(201).json({
					id: user._id,
					username: username,
					session: session,
					nickname: user.nickname,
					joinedRoom: user.joinedRoom,
				})
			}
			return res.sendStatus(403)
		}
		return res.sendStatus(400)
	})

	app.post("/api/signup", async (req, res) => {
		if (req.body.username && req.body.password) {
			let username = req.body.username.toString()
			let user = await User.findOne({ username })
			if (user) {
				return res.sendStatus(400)
			}
			let nickname = req.body.nickname
			if (!nickname) {
				nickname = username
			}
			let passwordHash = crypto
				.createHash("sha512")
				.update(req.body.password + salt)
				.digest("hex")
			let seed = Math.random() + "" + Math.random() + "" + Math.random()
			let session = crypto.createHash("sha512").update(seed).digest("hex")
			let sessionKey = crypto
				.createHash("sha512")
				.update(session)
				.digest("hex")
			await User.create({
				nickname: nickname,
				username: username,
				password: passwordHash,
				sessionKey: sessionKey,
			})
			return res.status(201).json({
				nickname: req.body.nickname,
				username: username,
				session: session,
			})
		}
		return res.sendStatus(400)
	})
}
