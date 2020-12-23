const express = require('express');
const app = express();
const socket = require('socket.io');

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const io = socket(
  app.listen(PORT, () => {
    console.log('listening on port', PORT);
  })
);

io.on('connection', (socket) => {
  //console.log('a user connected');
  socket.on('disconnect', () => {
    //console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    //console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
