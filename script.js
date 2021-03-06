let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let score = document.getElementById("score");
let box = 32;
canvas.width = 16 * box;
canvas.height = 16 * box;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = "right";
let lastDirection = direction;
let food = {
  x: Math.floor(Math.random() * 16) * box,
  y: Math.floor(Math.random() * 16) * box,
};

function criarBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "orange";
  context.fillRect(food.x, food.y, box, box);
}

function getPoints(length) {
  let points;
  if (length < 11) points = 5;
  else if (length < 20) points = 10;
  else if (length < 30) points = 20;
  else points = 30;
  return points;
}

function spawnFood() {
  food.x = Math.floor(Math.random() * 16) * box;
  food.y = Math.floor(Math.random() * 16) * box;
  for (i = 0; i < snake.length; i++) {
    if (food.x == snake[i].x && food.y == snake[i].y) {
      return false;
    }
  }
  return true;
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener("keydown", update);

function update(event) {
  if ((event.keyCode == 65 || event.keyCode == 37) && lastDirection != "right") direction = "left";
  if ((event.keyCode == 87 || event.keyCode == 38) && lastDirection != "down") direction = "up";
  if ((event.keyCode == 68 || event.keyCode == 39) && lastDirection != "left") direction = "right";
  if ((event.keyCode == 83 || event.keyCode == 40) && lastDirection != "up") direction = "down";
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && lastDirection == "right") snake[0].x = 0;
  if (snake[0].x < 0 && lastDirection == "left") snake[0].x = 15 * box;
  if (snake[0].y > 15 * box && lastDirection == "down") snake[0].y = 0;
  if (snake[0].y < 0 && lastDirection == "up") snake[0].y = 15 * box;

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert("Game Over :(");
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score.textContent = Number(score.textContent) + getPoints(snake.length);
    while (!spawnFood()); //keeps trying to spawn food outside the snake's body until it succeeds
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
  lastDirection = direction;
}

let jogo = setInterval(iniciarJogo, 100);
