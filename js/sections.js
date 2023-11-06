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

//Lives Section
const lives = document.querySelector('.lives');
lives.style.display = 'none';
const livesValue = document.getElementById('lives-value');

//Game Over Section
const GameOver = document.querySelector('.end-game');
GameOver.style.display = 'none';

// Restart Button
const restartButton = document.getElementById('restart');
  restartButton.onclick = () => {
  gameOver = false;
  resetScore();
  GameOver.style.display = 'none';
  canvas.style.display = '';
  startGame();
}