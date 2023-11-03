//opening music
const opening = new Audio('./audio/opening.mp3');

//sound effects
const explosion = new Audio('./audio/asteroid.mp3');
const laser = new Audio('./audio/laser.mp3');

let openingAudioPlaying = false;

// Function to start playing the opening audio
function playOpeningAudio() {
  opening.play()
    .then(() => {
      openingAudioPlaying = true;
    })
    .catch((error) => {
      console.error('Error playing opening audio:', error);
      openingAudioPlaying = false;
    });
}

// Function to pause the opening audio
function pauseOpeningAudio() {
  opening.pause();
  openingAudioPlaying = false;
  volumeIcon.classList.remove('fa', 'fa-volume-up');
  volumeIcon.classList.add('fa', 'fa-volume-mute');
}

const openingAudio = document.querySelector('.play-music');
const volumeIcon = document.getElementById('volume-icon');
//Audio Controls
/* const audioControls = document.querySelector('.utility-buttons');
audioControls.style.display = 'none'; */

// Click event listener to the opening audio element
openingAudio.addEventListener('click', () => {
  if (openingAudioPlaying) {
    pauseOpeningAudio();
    volumeIcon.classList.remove('fa', 'fa-volume-up');
    volumeIcon.classList.add('fa', 'fa-volume-mute');
  } else {
    playOpeningAudio();
    volumeIcon.classList.remove('fa', 'fa-volume-mute');
    volumeIcon.classList.add('fa', 'fa-volume-up');
  }
});

// Event listener for the "ended" event of the opening audio
opening.addEventListener('ended', () => {
  openingAudioPlaying = false;
  volumeIcon.classList.remove('fa', 'fa-volume-up');
  volumeIcon.classList.add('fa', 'fa-volume-mute');
});

//Pause in-game music
let gameMusicPlaying = true;

function pauseGameMusic() {
    if (gameMusicPaused) {
      nextSong.play(); // Resume the in-game music
      gameMusicPaused = false;
      muteButton.innerHTML = '<img id="mute" src="./images/mute.png"/>';
    } else {
      nextSong.pause(); // Pause the in-game music
      gameMusicPaused = true;
      muteButton.innerHTML = '<img id="play" src="./images/play.png"/>'; 
    }
  }

  //Mute Button
const muteButton = document.getElementById('mute-button');

// Mute event listener to the opening audio element
muteButton.addEventListener('click', () => {
    pauseGameMusic();
  });

  //Next Button

const nextButton = document.getElementById('next-button');

nextButton.addEventListener('click', playNextRandomSong);

function preventSpacebarClick(buttonElement) {
  buttonElement.addEventListener("click", function (e) {
  });

  // Prevent the spacebar from triggering a click event on the button
  buttonElement.addEventListener("keydown", function (e) {
    if (e.key === " ") {
      e.preventDefault();
    }
  });
}

// Apply the behavior to both buttons
preventSpacebarClick(muteButton);
preventSpacebarClick(nextButton);
