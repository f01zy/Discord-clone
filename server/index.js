require("dotenv").config()
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const router = require("./router")
const http = require("http")
const errMiddleware = require("./middlewares/Error")
const { Server } = require("socket.io")
const MessageService = require("./service/Message")
const UserService = require("./service/User")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(express.static(__dirname + "/static"))
app.use("/api", router)
app.use(errMiddleware)

const server = http.createServer(app)
const PORT = process.env.PORT || 3000


const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
})

io.on("connection", socket => {
  socket.on("send_message", async data => {
    const user = await MessageService.addMessage(data.email, data.message, data.guild, data.category, data.channel)
    io.emit("receive_message", {
      ...data,
      user
    })
  })

  socket.on("send_message_for_user", async data => {
    const user = await MessageService.addMessageForUser(data.username, data.message, data.userUsername)
    io.emit("receive_message_for_user", {
      ...data,
      user
    })
  })

  socket.on("send_to_friends", async data => {
    io.emit("receive_to_friends", data)
  })

  socket.on("send_confirm_to_friends", async data => {
    io.emit("receive_confirm_to_friends", data)
  })
})


const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    server.listen(PORT, () => {
      console.log(`app started in ${PORT} port`);
    })
  } catch (e) {
    console.log(e);
  }
}

start()