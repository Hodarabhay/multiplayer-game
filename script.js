const socket = io();
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset');
let currentPlayer = 'X';

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.textContent === '') {
      cell.textContent = currentPlayer;
      socket.emit('makeMove', {
        id: cell.dataset.id,
        player: currentPlayer
      });
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

socket.on('moveMade', data => {
  const cell = document.querySelector(`.cell[data-id="${data.id}"]`);
  if (cell.textContent === '') {
    cell.textContent = data.player;
    currentPlayer = data.player === 'X' ? 'O' : 'X';
  }
});

resetBtn.addEventListener('click', () => {
  cells.forEach(cell => cell.textContent = '');
  socket.emit('resetGame');
});

socket.on('gameReset', () => {
  cells.forEach(cell => cell.textContent = '');
});
