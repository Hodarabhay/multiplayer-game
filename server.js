const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('makeMove', (data) => {
    socket.broadcast.emit('moveMade', data);
  });

  socket.on('resetGame', () => {
    io.emit('gameReset');
  });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
