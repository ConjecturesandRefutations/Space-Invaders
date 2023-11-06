//opening music
const opening = new Audio('./audio/opening.mp3');

//sound effects
const explosion = new Audio('./audio/asteroid.mp3'); 
const laser = new Audio('./audio/laser.mp3'); 
const crash = new Audio ('./audio/crash.wav')

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

  //Mute Button
  const muteButton = document.getElementById('mute-button');
  muteButton.style.display = 'none';
  let isSoundOn = true;

  muteButton.addEventListener('click', () => {
      if (muteButton.classList.contains('mute')) {
          muteButton.classList.remove('mute');
          muteButton.classList.add('play');
          muteButton.innerHTML = '<img id="play" src="./images/play.png"/>';
          isSoundOn = false;
      } else {
          muteButton.classList.remove('play');
          muteButton.classList.add('mute');
          muteButton.innerHTML = '<img id="mute" src="./images/mute.png"/>';
          isSoundOn = true;
      }
  });
  



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