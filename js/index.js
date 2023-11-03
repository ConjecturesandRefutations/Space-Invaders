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
const backButton = document.querySelector('.back');
  backButton.onclick = () => {
  openingSection.style.display = '';
  instructionSection.style.display = 'none';
}