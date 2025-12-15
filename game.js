const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

// Player
let player = {
  x: 50,
  y: 180,
  size: 20,
  speed: 5
};

// Bullets array
let bullets = [];

// Draw Player
function drawPlayer() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Draw Bullets
function drawBullets() {
  ctx.fillStyle = "red";
  bullets.forEach((bullet, index) => {
    bullet.x += bullet.speed;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

    // Remove bullet if out of screen
    if (bullet.x > canvas.width) {
      bullets.splice(index, 1);
    }
  });
}

// Shoot Bullet
function shoot() {
  bullets.push({
    x: player.x + player.size,
    y: player.y + player.size / 2 - 2,
    width: 10,
    height: 4,
    speed: 8
  });
}

// Game Loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// Controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.y -= player.speed;
  if (e.key === "ArrowDown") player.y += player.speed;
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;

  // SPACEBAR to shoot
  if (e.code === "Space") {
    shoot();
  }
});