// Key Variables
let background = new Image();
let backgroundX = 0;
let currentShip;

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

// Update and draw rockets
for (let i = currentGame.rockets.length - 1; i >= 0; i--) {
  const rocket = currentGame.rockets[i];

  if (rocket.isAlive) {
    rocket.update();
    rocket.draw();

  } else {
    // Remove dead rockets from the array
    currentGame.rockets.splice(i, 1);
  }

}

  // Continue the animation loop
  animationID = requestAnimationFrame(updateCanvas);

}

