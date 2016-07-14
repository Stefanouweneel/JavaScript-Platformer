var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
var originalPosition = {};
var playerPosition = { x: 100, y: 300, width: 20, height: 20};
var player2Position = { x: 70, y: 300, width: 20, height: 20};
var objectPosition = { x: 480, y: 250, width: 40, height: 20};
var floorPosition = { x: 0, y: 300 };
var enemyPositions = [{ x: 480, y: 250, width: 40, height: 20, speed: 3},{ x: 480, y: 270, width: 20, height: 20, speed: 5},{ x: 480, y: 180, width: 20, height: 20, speed: 10}];
var confuzerPosition = { x: 700, y: 250 };
var speed = 200;
var numberOfRedraws = 0;
var points = 0;
var points2 = 0;

function renderFloor(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 500, 250);
}

function renderPlayer(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 20, 20);
}

function renderPlayer2(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 20, 20);
}

function renderObject(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 40, 20);
}

function renderConfuzer(position, color) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 40, 20);
}

function renderPoints(positions) {
  for (i=0; i < positions.length; i++){
    if (positions[i].x === 0) {
      points += 1;
      console.log(points);
    }
  }
  if (confuzerPosition.x === 0) {
    points += 5;
    confuzerPosition.x = 1000;
  }
  document.getElementById("points").innerHTML = points;
}

function renderPoints2(positions) {
  for (i=0; i < positions.length; i++){
    if (positions[i].x === 0) {
      points2 += 1;
      console.log(points2);
    }
  }
  if (confuzerPosition.x === 0) {
    points2 += 5;
    confuzerPosition.x = 1000;
  }
  document.getElementById("points").innerHTML = points;
}

function movePlayer() {
  originalPosition = {
    x: playerPosition.x,
    y: playerPosition.y
  };
}

function movePlayer2() {
  originalPosition = {
    x: player2Position.x,
    y: player2Position.y
  };
}

function jumpPlayer() {
  console.log(playerPosition.y)
  if (playerPosition.y === 280) {
    playerPosition.y = playerPosition.y - 150;
  }
  else {
    if (playerPosition.y < 0){
     window.location.reload();
    }
  }
}

function jumpPlayer2() {
  console.log(player2Position.y)
  if (player2Position.y === 280) {
    player2Position.y = player2Position.y - 150;
  }
  else {
    if (player2Position.y < 0){
     window.location.reload();
    }
  }
}

function objectCollision(positions) {
  for (i=0; i < positions.length; i++){
    if (playerPosition.x < positions[i].x + positions[i].width &&
       playerPosition.x + playerPosition.width > positions[i].x &&
       playerPosition.y < positions[i].y + positions[i].height &&
       playerPosition.height + playerPosition.y > positions[i].y) {
    // if (playerPosition.y === positions[i].y &&
    //     playerPosition.x === positions[i].x) {
     window.location.reload();
    //  alert('You are dead!');
    }
  }
}

function objectCollision2(positions) {
  for (i=0; i < positions.length; i++){
    if (player2Position.x < positions[i].x + positions[i].width &&
       player2Position.x + player2Position.width > positions[i].x &&
       player2Position.y < positions[i].y + positions[i].height &&
       player2Position.height + player2Position.y > positions[i].y) {
    // if (playerPosition.y === positions[i].y &&
    //     playerPosition.x === positions[i].x) {
     window.location.reload();
    //  alert('You are dead!');
    }
  }
}

function fallSpeed() {
  playerPosition.y = playerPosition.y + 5;
    if (playerPosition.y > 280) {
      playerPosition.y = 280;
    }
}

function fallSpeed2() {
  player2Position.y = player2Position.y + 5;
    if (player2Position.y > 280) {
      player2Position.y = 280;
    }
}

function renderEnemies(positions, color) {
  for (i = 0; i < positions.length; i++) {
    ctx.fillStyle = color;
    ctx.fillRect(positions[i].x, positions[i].y, positions[i].width, positions[i].height);
  }
}

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderFloor(floorPosition, "#dab9a2");
  renderPlayer(playerPosition, "#4d5565");
  renderPlayer2(player2Position, "#4d5565");
  renderEnemies(enemyPositions, "#81c1bf");
    for (i = 0; i < enemyPositions.length; i++) {
      enemyPositions[i].x -= enemyPositions[i].speed;
    }
    objectPosition.x -= 4;
  renderConfuzer(confuzerPosition, "#db2b39");
  confuzerPosition.x -=4;
  setTimeout(function() {
    renderPoints(enemyPositions);
    renderPoints2(enemyPositions);
    objectCollision(enemyPositions);
    objectCollision2(enemyPositions);
    redraw();
    fallSpeed();
    fallSpeed2();
  }, 30);
}

function checkKey(e) {
  e = e || window.event;
  // if player 1
  console.log(e.keyCode)
  if (confuzerPosition.x > 0 && confuzerPosition.x < 500) {
    if (e.keyCode == '38') {
      e.preventDefault();
      jumpPlayer();
    }
    if (e.keyCode == '87') {
      e.preventDefault();
      jumpPlayer2();
    }
  } else {
    if (e.keyCode == '32') {
      e.preventDefault();
      jumpPlayer(); 
    }
    if (e.keyCode == '83') {
      e.preventDefault();
      jumpPlayer2();
    }
  }
}

document.onkeyup = checkKey;

movePlayer();
movePlayer2();
redraw();
