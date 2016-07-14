var canvas = document.getElementById("board");
var context = canvas.getContext("2d");

var originalPosition = {};
var playerPosition = { x: 250, y: 250 };
var speed = 200;

function renderBlock(position, color) {
  context.fillStyle = color;
  context.fillRect(position.x, position.y, 10, 10);
}

function movePlayer() {
  originalPosition = {
    x: playerPosition.x,
    y: playerPosition.y
  };
}

function jumpPlayer() {
  playerPosition.y = playerPosition.y === 0 ? window.location.reload() : playerPosition.y -= 10;
}

function redraw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  renderBlock(playerPosition, "green");
  setTimeout(function() {
    redraw();
  }, 30);
}

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    e.preventDefault();
    console.log("YAY");
    jumpPlayer();
  }
}

document.onkeydown = checkKey;

movePlayer();
redraw();
