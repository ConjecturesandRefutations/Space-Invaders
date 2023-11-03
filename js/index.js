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