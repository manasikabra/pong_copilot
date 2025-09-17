const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const paddleHeight = 100, paddleWidth = 12;
const ballSize = 16;
const playerX = 10, aiX = canvas.width - paddleWidth - 10;

let playerY = canvas.height/2 - paddleHeight/2;
let aiY = canvas.height/2 - paddleHeight/2;
let ballX = canvas.width/2 - ballSize/2;
let ballY = canvas.height/2 - ballSize/2;
let ballSpeedX = 6 * (Math.random() > 0.5 ? 1 : -1);
let ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);

let scorePlayer = 0, scoreAI = 0;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "40px Arial";
  ctx.fillText(text, x, y);
}

function resetBall() {
  ballX = canvas.width/2 - ballSize/2;
  ballY = canvas.height/2 - ballSize/2;
  ballSpeedX = 6 * (Math.random() > 0.5 ? 1 : -1);
  ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function updateScore() {
  document.getElementById('score-player').textContent = scorePlayer;
  document.getElementById('score-ai').textContent = scoreAI;
}

function collision(paddleX, paddleY) {
  return ballX < paddleX + paddleWidth &&
         ballX + ballSize > paddleX &&
         ballY < paddleY + paddleHeight &&
         ballY + ballSize > paddleY;
}

function moveAI() {
  let center = aiY + paddleHeight / 2;
  if (center < ballY + ballSize/2 - 10) aiY += 5;
  else if (center > ballY + ballSize/2 + 10) aiY -= 5;
  aiY = Math.max(0, Math.min(canvas.height - paddleHeight, aiY));
}

function draw() {
  // Clear
  drawRect(0, 0, canvas.width, canvas.height, '#111');

  // Middle line
  for (let i = 0; i < canvas.height; i += 40) {
    drawRect(canvas.width/2 - 2, i, 4, 20, '#333');
  }

  // Paddles
  drawRect(playerX, playerY, paddleWidth, paddleHeight, '#fff');
  drawRect(aiX, aiY, paddleWidth, paddleHeight, '#fff');

  // Ball
  drawCircle(ballX + ballSize/2, ballY + ballSize/2, ballSize/2, '#fff');
}

function update() {
  // Ball movement
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Wall collision
  if (ballY <= 0 || ballY + ballSize >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Paddle collision
  if (collision(playerX, playerY)) {
    ballSpeedX = -ballSpeedX;
    // Add some "spin" based on where it hit
    let hitPos = (ballY + ballSize/2 - (playerY + paddleHeight/2)) / (paddleHeight/2);
    ballSpeedY += hitPos * 2;
    ballX = playerX + paddleWidth;
  }
  if (collision(aiX, aiY)) {
    ballSpeedX = -ballSpeedX;
    let hitPos = (ballY + ballSize/2 - (aiY + paddleHeight/2)) / (paddleHeight/2);
    ballSpeedY += hitPos * 2;
    ballX = aiX - ballSize;
  }

  // Score
  if (ballX < 0) {
    scoreAI++;
    updateScore();
    resetBall();
  }
  if (ballX + ballSize > canvas.width) {
    scorePlayer++;
    updateScore();
    resetBall();
  }

  // Move AI
  moveAI();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Mouse movement for left paddle
canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  let mouseY = e.clientY - rect.top;
  playerY = mouseY - paddleHeight/2;
  playerY = Math.max(0, Math.min(canvas.height - paddleHeight, playerY));
});

// Arrow key movement
document.addEventListener('keydown', function(e) {
  if (e.key === "ArrowUp") {
    playerY -= 20;
  } else if (e.key === "ArrowDown") {
    playerY += 20;
  }
  playerY = Math.max(0, Math.min(canvas.height - paddleHeight, playerY));
});

updateScore();
gameLoop();