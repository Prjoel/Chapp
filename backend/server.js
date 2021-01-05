const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const { formatMsg } = require('./middleware/formats');
const bodyParser = require('body-parser');
const MsgService = require('./dbservice/messageService')

const PORT = process.env.PORT || 8000;

const cl = console.log;

const users = [];

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send('I\'m alive').status(200);
});

app.post("/", (req, res) => {
  const value = req.body;
  console.log(value);
  res.sendStatus(201);
});

const io = socket(
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  }),
  {//  this obj keeps the options for the socket connections.
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  }
);

io.on("connection", (socket) => {
  console.log("a user connected");
  //console.log(socket.id, socket.handshake, socket.rooms);
  socket.on("disconnect", () => {

    let disconnectedUser = users.findIndex(item => item.connectionId === socket.id);
    if (disconnectedUser >= 0) {
      users.splice(disconnectedUser, 1);
      io.emit("send users", users);
    }
  });

  socket.on("chat message", async (msg) => {
    cl("chat message", msg)
    let date = new Date();
    await MsgService.saveMsg({userId: msg.author.id, message: msg.text, date: date});
    
    const formatedMsg = formatMsg(msg);
    formatedMsg.isOwnMsg = false;
    socket.broadcast.emit("chat message", formatedMsg);

  });
  socket.on("private message", (anotherSocketId, msg) => {
    cl("private message", anotherSocketId, '-info-', msg)
    msg.author.socketId = socket.id;
    msg.isOwnMsg = false;
    socket.to(anotherSocketId).emit("private message", msg);
  })
  socket.on("registered user", (user) => {
    user.socketId = socket.id;
    let alreadyHere = users.find(item => item.id === user.id)
    if (typeof user.nickname === 'string' && !alreadyHere) {
      users.push(user);
    }
    io.emit("send users", users);
  })


  socket.on("typing", (typing) => {
    const whoTypes = users.find(item => item.connectionId === socket.id);
    if (whoTypes) {
      socket.broadcast.emit("typing", { typing: true, nickname: whoTypes.nickname });
    }
  });



});
