var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
var originalPosition = {};
var playerPosition = { x: 100, y: 250 };
var objectPosition = { x: 480, y: 250 };

var confuzerPosition = { x: 1000, y: 250 };
var floorPosition = { x: 0, y: 300 }
var speed = 200;

var numberOfRedraws = 0;
var points = 0;

function renderFloor(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 500, 250);
}

function renderPlayer(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 20, 50);
}

function renderObject(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 40, 20);
}

function renderConfuzer(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 40, 20);
}

function renderPoints() {
  if (objectPosition.x === 0) {
    points += 1;
    console.log(points);
    document.getElementById("points").innerHTML = points;
  }
}

function movePlayer() {
  originalPosition = {
    x: playerPosition.x,
    y: playerPosition.y
  };
}

function jumpPlayer() {
  console.log(playerPosition.y)
  if (playerPosition.y === 250) {
    playerPosition.y = playerPosition.y - 150;
  }
  else {
    if (playerPosition.y < 0){
     window.location.reload();
    }
  }
}

function objectCollision() {
  if (playerPosition.y === objectPosition.y &&
      playerPosition.x === objectPosition.x) {
   window.location.reload();
  //  alert('You are dead!');
  }
}

function fallSpeed() {
  playerPosition.y = playerPosition.y + 5;
    if (playerPosition.y > 250) {
      playerPosition.y = 250;
    }
}

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderFloor(floorPosition, "#dab9a2");
  renderPlayer(playerPosition, "#4d5565");
  renderObject(objectPosition,"#81c1bf");
  renderConfuzer(confuzerPosition, "#db2b39");
  objectPosition.x -= 4;
  confuzerPosition.x -=4;
  setTimeout(function() {
    renderPoints();
    objectCollision();
    redraw();
    fallSpeed();
  }, 30);
}

function checkKey(e) {
  e = e || window.event;
  if (confuzerPosition.x > 0 && confuzerPosition.x < 500) {
    if (e.keyCode == '38') {
      e.preventDefault();
      jumpPlayer();
    }
  } else {
  if (e.keyCode == '32') {
    e.preventDefault();
    jumpPlayer();
    }
  }
}

document.onkeydown = checkKey;

movePlayer();
redraw();
