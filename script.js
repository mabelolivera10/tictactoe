const board = document.getElementById('board');
const playerHeartScore = document.getElementById('playerHeart');
const playerSmileyScore = document.getElementById('playerSmiley');
const drawScore = document.getElementById('draw');
const notification = document.getElementById('notification');
let currentPlayer = 'heart';
let gameOver = false;
let scoreHeart = 0;
let scoreSmiley = 0;
let scoreDraw = 0;

// Crear celdas del tablero
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', handleCellClick);
  board.appendChild(cell);
}

function handleCellClick(event) {
  if (gameOver) return;

  const clickedCell = event.target;
  const index = clickedCell.dataset.index;

  if (isCellEmpty(index)) {
    // Marcar la celda con el símbolo del jugador actual
    clickedCell.classList.add(currentPlayer);

    // Verificar si hay un ganador
    if (checkWinner()) {
      const winner = currentPlayer === 'heart' ? 'Corazón' : 'Carita feliz';
      showNotification(`¡Jugador ${winner} ha ganado!`);
      updateScore();
      resetGame();
      return;
    }

    // Cambiar al siguiente jugador
    currentPlayer = currentPlayer === 'heart' ? 'smiley' : 'heart';

    // Verificar si hay empate
    if (isBoardFull()) {
      showNotification('¡Empate!');
      updateDrawScore();
      resetGame();
      return;
    }
  }
}

function showNotification(message) {
  notification.textContent = message;
  notification.style.display = 'block';

  // Ocultar la notificación después de 2 segundos
  setTimeout(() => {
    notification.style.display = 'none';
  }, 2000);
}

function isCellEmpty(index) {
  const cell = document.querySelector(`.cell[data-index="${index}"]`);
  return !cell.classList.contains('heart') && !cell.classList.contains('smiley');
}

function checkWinner() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const cells = document.querySelectorAll('.cell');
    if (cells[a].classList.contains(currentPlayer) && cells[b].classList.contains(currentPlayer) && cells[c].classList.contains(currentPlayer)) {
      return true;
    }
  }

  return false;
}

function isBoardFull() {
  const cells = document.querySelectorAll('.cell');
  for (const cell of cells) {
    if (!cell.classList.contains('heart') && !cell.classList.contains('smiley')) {
      return false;
    }
  }
  return true;
}

function updateScore() {
  if (currentPlayer === 'heart') {
    scoreHeart++;
    playerHeartScore.textContent = `Corazón: ${scoreHeart}`;
  } else {
    scoreSmiley++;
    playerSmileyScore.textContent = `Carita feliz: ${scoreSmiley}`;
  }
}

function updateDrawScore() {
  scoreDraw++;
  drawScore.textContent = `Empate: ${scoreDraw}`;
}

function resetGame() {
  // Limpiar el contenido de las celdas
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('heart', 'smiley');
  });

  // Reiniciar variables
  currentPlayer = 'heart';
  gameOver = false;
}
