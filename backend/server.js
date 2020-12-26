const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const { formatMsg } = require('./middleware/formats');

const PORT = process.env.PORT || 8000;

const cl = console.log;

const users = [];

const corsOptions = {
  origin: "http://127.0.0.1:3000/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//app.use( cors(corsOptions) );

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

const io = socket(
  app.listen(PORT, () => {
    console.log("listening on port", PORT);
  }),
  {
    //  this obj keeps the options for the connections.
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
    }
  }
);

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log(`user with connection ${socket.id} disconnected`);
  });

  socket.on("chat message", (msg) => {
    const formatedMsg = formatMsg(msg);
    io.emit("chat message", formatedMsg);
  });

  socket.on("registered user", (user) => {
    let alreadyHere = users.find(item => item.id === user.id)
    if (Object.keys(user).length === 2 && typeof user.nickname === 'string' && !alreadyHere) {
      users.push(user);
    }
    io.emit("send users", users);
  })
});
