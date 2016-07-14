var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
var originalPosition = {};
var playerPosition = { x: 100, y: 250 };
var objectPosition = { x: 480, y: 250 };
<<<<<<< HEAD
var confuzerPosition = { x: 480, y: 250 };
||||||| merged common ancestors

=======
>>>>>>> 9a35964f5829ed6a4e06d7f577b70094a80010dd
var floorPosition = { x: 0, y: 300 }
var speed = 200;
<<<<<<< HEAD
var numberOfRedraws = 0;

function renderFloor(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 500, 200);
}
||||||| merged common ancestors
=======
var points = 0;
>>>>>>> 9a35964f5829ed6a4e06d7f577b70094a80010dd

function renderPlayer(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 20, 50);
}

function renderObject(position, color) {
  ctx.fillStyle = color;
<<<<<<< HEAD
  ctx.fillRect(position.x, position.y, 20, 2);
||||||| merged common ancestors
  ctx.fillRect(position.x, position.y, 500, 200);
=======
  ctx.fillRect(position.x, position.y, 500, 250);
>>>>>>> 9a35964f5829ed6a4e06d7f577b70094a80010dd
}

function renderConfuzer(position, color) {
  ctx.fillStyle = color;
<<<<<<< HEAD
  ctx.fillRect(position.x, position.y, 20, 2);

||||||| merged common ancestors
  ctx.fillRect(position.x, position.y, 20, 2);
  setTimeout(function() {
    renderObject(objectPosition,"red");
  }, 1000);
=======
  ctx.fillRect(position.x, position.y, 40, 20);
  setTimeout(function() {
    renderObject(objectPosition,"red");
  }, 1000);
>>>>>>> 9a35964f5829ed6a4e06d7f577b70094a80010dd
}

function renderPoints() {
  if (objectPosition.x === 0) {
    points += 1;
    console.log(points);
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

  numberOfRedraws += 1;
  console.log(numberOfRedraws)
  confuzer()
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderFloor(floorPosition, "grey");
  renderPlayer(playerPosition, "green");
  renderObject(objectPosition,"red");
  objectPosition.x -= 4;
  setTimeout(function() {
    renderPoints();
    objectCollision();
    redraw();
    fallSpeed();
  }, 30);
}


function confuzer() {
  if (numberOfRedraws === 40) {
    renderConfuzer(confuzerPosition, "black");
    console.log("confuzer")
    numberOfRedraws = 0;
  }
}


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
