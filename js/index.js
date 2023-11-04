// Key Variables
let background = new Image();
let backgroundX = 0;
let currentShip;
let obstaclesFrequency = 0; //Logic for generating obstacles
let obstacleSpeed = 0.2;
let startTime = 0;
divisor = 50;

// Opening Section
const openingSection = document.querySelector('.opening-section');

//Instructions Section
const instructionSection = document.querySelector('.instruction-section');
instructionSection.style.display = 'none';
//Instruction Button
const instructionButton = document.querySelector('.instruction');
  instructionButton.onclick = () => {
    openingSection.style.display = 'none';
    instructionSection.style.display = '';
}

// Back Button
const backButton = document.querySelectorAll('.back'); 

for (let i = 0; i < backButton.length; i++) {
  backButton[i].addEventListener('click', () => {
    instructionSection.style.display = 'none';
    settingsSection.style.display = 'none';
    openingSection.style.display = '';
  });
}

//Instructions Section
const settingsSection = document.querySelector('.setup-section');
settingsSection.style.display = 'none';
//settings Button
const settingsButton = document.querySelector('.settings');
  settingsButton.onclick = () => {
    openingSection.style.display = 'none';
    settingsSection.style.display = '';
}

//Score Section
const score = document.querySelector('.score');
score.style.display = 'none';
const scoreValue = document.getElementById('score-value');

// Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.style.display = 'none';

// Start Button
let animationID; // Store the animation ID
window.onload = () => {
  const startButton = document.getElementById('start-button');
  startButton.onclick = () => {
    openingSection.style.display = 'none';
    canvas.style.display = '';
    score.style.display = '';
    startGame();
  };
};

function startGame() {
  // Clear any previous animation loop
  cancelAnimationFrame(animationID);

    currentGame = new Game();
    currentGame.rockets = [];

    // Instantiate a new ship
    currentShip = new Ship();
    currentShip.drawShip();

  // Start the animation loop
  animationID = requestAnimationFrame(updateCanvas);
}

function updateCanvas() {

  const currentTime = Date.now();
  const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds

  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  // Scroll the background to the left
  backgroundX -= 0.3;
  // Reset the background position if it goes beyond the canvas width
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }

  // Draw background image
  ctx.drawImage(background, backgroundX, 0, canvas.width, canvas.height);
  // Draw the second copy of the background image to create the continuous scroll
  ctx.drawImage(background, backgroundX + canvas.width, 0, canvas.width, canvas.height);

  currentShip.drawShip(); // redraw the ship at its current position
  obstaclesFrequency++;

// Update and draw rockets
for (let i = currentGame.rockets.length - 1; i >= 0; i--) {
  const rocket = currentGame.rockets[i];

  if (rocket.isAlive) {
    rocket.update();
    rocket.draw();

    // Check for collisions with obstacles
    for (let j = currentGame.obstacles.length - 1; j >= 0; j--) {
      const obstacle = currentGame.obstacles[j];

      if (obstacle.collidesWith(rocket.x, rocket.y)) {
        if (!obstacle.wasHit) { // Check if the obstacle was not hit before
          obstacle.destroy();
          explosion.play();
          currentGame.score++;
          scoreValue.innerText = currentGame.score;
          obstacle.wasHit = true; // Mark the obstacle as hit
        }

        // Remove the rocket from the array
        currentGame.rockets.splice(i, 1);
      }
    }
  } else {
    // Remove dead rockets from the array
    currentGame.rockets.splice(i, 1);
  }
}
  
if (obstaclesFrequency % divisor === 1) {
  // Generate a new obstacle at the top of the canvas
  const randomObstacleWidth = 30
  const randomObstacleHeight = 30
  const randomObstacleX = Math.floor(Math.random() * canvas.width); // Randomize X position
  const randomObstacleY = -randomObstacleHeight;

  const newObstacle = new Obstacle(
    randomObstacleX,
    randomObstacleY,
    randomObstacleWidth,
    randomObstacleHeight
  );

  newObstacle.horizontalSpeed = 3; // Initial horizontal speed
    
  currentGame.obstacles.push(newObstacle);
   
}

for (let i = 0; i < currentGame.obstacles.length; i++) {
  const obstacle = currentGame.obstacles[i];

     // Occasionally make the obstacle shoot a downward bullet
     if (Math.random() < 0.2) {
      obstacle.shootDownwardBullet();
    }
  // Check if it's time for the obstacle to shoot a bullet
  if (obstacle.shootBullet) {
    obstacle.updateBullet();
  }

  if (obstacle.wasHit && obstacle.currentExplosionFrame >= obstacle.explosionFrames) {
    // Remove obstacles after the explosion animation is finished
    currentGame.obstacles.splice(i, 1);
  } else {
    obstacle.drawObstacle();
  }

  // Move obstacles downwards
  obstacle.y += obstacleSpeed;

  // Move obstacles horizontally with a reverse direction when hitting the canvas boundaries
  obstacle.x += obstacle.horizontalSpeed;
  if (obstacle.x + obstacle.width >= canvas.width || obstacle.x <= 0) {
    obstacle.horizontalSpeed *= -1; // Reverse the horizontal direction
  }

  if (elapsedTimeInSeconds >= 20) { // Increase level every 20 seconds
    obstacle.horizontalSpeed++;
  }

  // Logic for removing obstacles
  if (obstacle.y >= canvas.height) {
    currentGame.obstacles.splice(i, 1); // remove that obstacle from the array
  }
}

if (elapsedTimeInSeconds >= 20) { // Increase level every 20 seconds
  obstacleSpeed += 0.1;
  currentGame.level++;
  if (divisor > 2) {
      divisor -= 4;
  }
  startTime = currentTime; // Reset the start time
}
  // Continue the animation loop
  animationID = requestAnimationFrame(updateCanvas);

}

