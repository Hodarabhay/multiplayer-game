const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('makeMove', (data) => {
    socket.broadcast.emit('moveMade', data);
  });

  socket.on('resetGame', () => {
    io.emit('gameReset');
  });
});

// Start server (ONLY ONE listen)
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
