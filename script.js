var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
var originalPosition = {};
var playerPosition = { x: 100, y: 250 };
var objectPosition = { x: 480, y: 250 };
var floorPosition = { x: 0, y: 300 }
var speed = 200;
var numberOfRedraws = 0;

function renderFloor(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 500, 200);
}

function renderPlayer(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 20, 20);
}

function renderObject(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 20, 2);
}

function renderConfuzer() {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 20, 2);

}

function movePlayer() {
  originalPosition = {
    x: playerPosition.x,
    y: playerPosition.y
  };
}

function movingObject() {
  console.log("movingObject");
}

setTimeout(function() {
  movePlayer();
}, speed);

function jumpPlayer() {
  console.log(playerPosition.y)
  if (playerPosition.y === 250) {
    playerPosition.y = playerPosition.y - 100;
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
  }
}

function fallSpeed() {
  playerPosition.y = playerPosition.y + 3;
    if (playerPosition.y > 250) {
      playerPosition.y = 250;
    }
}

function redraw() {
  numberOfRedraws += 1;
  console.log(numberOfRedraws)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderFloor(floorPosition, "grey");
  renderPlayer(playerPosition, "green");
  renderObject(objectPosition,"red");
  objectPosition.x -= 4;
  setTimeout(function() {
    objectCollision();
    redraw();
    fallSpeed();
  }, 30);
}


// renderConfuzer(objectPosition, "pink");

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    e.preventDefault();
    jumpPlayer();
  }
}

document.onkeydown = checkKey;

movePlayer();
redraw();
