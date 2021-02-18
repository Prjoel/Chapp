const { formatMsg } = require('../utils/formats');
const socket = require("socket.io");

const users = [];

/**
 * Note that by passing the first param (the express instance) the server is already listening for requests.  
 * @param {Function} server express server instance.
 * @param {number} PORT port number to listen for requests. 
 */

function handleSocket(server, PORT) {
  const io = socket(
    server.listen(PORT, () => {
      console.log("listening on port", PORT);
    }),
    {//  this obj keeps the options for the socket connections.
      cors: {
        origin: false,
        methods: ["GET", "POST"]
      }
    }
  );

  io.on("connection", (socket) => {
    console.log("a user connected");
    
    socket.on("disconnect", () => {
      let disconnectedUser = users.findIndex(item => item.socketId === socket.id);
      if (disconnectedUser >= 0) {
        users.splice(disconnectedUser, 1);
        io.emit("send users", users);
      }
    });

    socket.on("chat message", async (msg) => {
      console.log("chat message", msg)
      const formatedMsg = formatMsg(msg);
      formatedMsg.isOwnMsg = false;
      socket.broadcast.emit("chat message", formatedMsg);
    });

    socket.on("private message", (anotherSocketId, msg) => {
      msg.isOwnMsg = false;
      msg.author.socketId = socket.id;
      socket.to(anotherSocketId).emit("private message", msg);
    });

    socket.on("currentUser", (user) => {
      user.socketId = socket.id;
      let alreadyHere = users.find(item => item.id === user.id)
      if (typeof user.username === 'string' && !alreadyHere) {
        users.push(user);
      }
      io.emit("send users", users);
    });

    socket.on("typing", (typing) => {
      const whoTypes = users.find(item => item.socketId === socket.id);
      if (whoTypes) {
        socket.broadcast.emit("typing", { typing: true, username: whoTypes.username });
      }
    });
  });
}

module.exports = handleSocket;