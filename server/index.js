const express = require("express")
const app = express()
const cors = require("cors")
const fileUpload = require("express-fileupload")
const Message = require("./models/Message")
const Room = require("./models/Room")
//app.use(cors())
app.use(cors({ credentials: true, origin: "http://localhost:8080" }))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
app.use(express.json({ limit: "1mb" }))
app.use(
	fileUpload({
		limits: {
			fileSize: 8000000,
			files: 5,
		},
	})
)
app.use("/", express.static(__dirname + "/public"))
require("./db")(app)
require("./routers/auth")(app)
require("./routers/index")(app)

var server = app.listen(3000, function () {
	console.log("Your app is listening on port " + 3000)
})
var io = require("socket.io").listen(server)
io.on("connection", (socket) => {
	console.log("a user connected")
	socket.on("disconnect", () => {
		console.log("user disconnected")
	})
	socket.on("joinRoom", (room) => {
		socket.leaveAll()
		console.log("user joined", room)
		socket.join(room)
	})
	socket.on("message", (data) => {
		Message.create(
			{
				user: data.userId.id,
				nickname: data.userId.nickname,
				content: data.message,
				room: data.id,
			},
			(err, res) => {
				if (err) {
					console.log("no")
				} else {
					console.log("message", res)
					Room.findByIdAndUpdate(
						res.room,
						{
							$addToSet: { messages: res.id },
						},
						(err, res) => {
							if (err) {
								console.log("消息添加失败")
							} else {
								console.log("消息添加!")
							}
						}
					)
					io.to(res.room).emit("message", res)
				}
			}
		)
	})
})
