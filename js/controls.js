class Ship {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height-200;
    this.width = 50;
    this.height = 70;
    this.angle = 0;
    this.img = this.getImagePath();
    this.leftButtonDown = false;
    this.rightButtonDown = false;
    this.throttleDelay = 100; // Keyboard Throttle Delay (Milliseconds)
    this.rocketFired = false;

    // Select the mobile-controls buttons
    this.leftButton = document.getElementById('left-button');
    this.rightButton = document.getElementById('right-button');

    // Event listeners for keyboard controls
    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event) => this.handleKeyUp(event));

    // Throttle the keydown event listeners
    this.throttledLeftStart = this.throttle(() => this.startMovingShip('left'), this.throttleDelay);
    this.throttledRightStart = this.throttle(() => this.startMovingShip('right'), this.throttleDelay);
  }

  getImagePath() {
    // Return the appropriate image path based on the currentColor
    switch (currentColor) {
      case 'shipOne':
        return './images/spaceship.png';
      case 'shipTwo':
        return './images/blueSpaceship.png';
      case 'shipThree':
      default:
        return './images/redSpaceship.png';
    }
  }

  drawShip() {
    const shipImg = new Image();
    shipImg.src = this.img;

    // Calculate the angle of rotation based on the ship's current direction
    let angle = this.angle;

    // Translate and rotate the ship's image
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(angle);
    ctx.drawImage(shipImg, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();

    // Update the ship's current direction
    this.angle = angle;
  }

  handleKeyDown(event) {
    if (event.keyCode === 37) {
      // left arrow key
      this.leftButtonDown = true;
      this.throttledLeftStart();
    } else if (event.keyCode === 39) {
      // right arrow key
      this.rightButtonDown = true;
      this.throttledRightStart();
    }
  }

  handleKeyUp(event) {
    if (event.keyCode === 37) {
      // left arrow key
      this.leftButtonDown = false;
      this.stopMovingShip();
    } else if (event.keyCode === 39) {
      // right arrow key
      this.rightButtonDown = false;
      this.stopMovingShip();
    } else if (event.keyCode === 32) {
      // space key
      this.rocketFired = false;
    }
  }

  throttle(callback, delay) {
    let lastCallTime = 0;
    return function () {
      const now = Date.now();
      if (now - lastCallTime >= delay) {
        lastCallTime = now;
        callback.apply(this, arguments);
      }
    };
  }

  startMovingShip(direction) {
    // Move the ship continuously as long as the corresponding button is pressed
    if (direction === 'left' && this.leftButtonDown && this.x > 5) {
      this.x -= 3;
    } else if (direction === 'right' && this.rightButtonDown && this.x < canvas.width - this.width - 5) {
      this.x += 3;
    }

    // Use requestAnimationFrame to keep moving the ship continuously
    if (this.leftButtonDown || this.rightButtonDown) {
      this.requestAnimationFrame = requestAnimationFrame(() => this.startMovingShip(direction));
    }
  }

  stopMovingShip() {
    // Stop the ship's movement when all buttons are released
    if (!this.leftButtonDown && !this.rightButtonDown) {
      cancelAnimationFrame(this.requestAnimationFrame);
    }
  }

  shootRocket() {
    if (!this.rocketFired) {
      const rocket = new Rocket(this.x, this.y, this.angle);
      currentGame.rockets.push(rocket);
      this.rocketFired = true; // Set the flag to true
      laser.play();
    }
  }
}

function addTouchListeners() {
  // Touch event handling for leftButton
  currentShip.leftButton.ontouchstart = (event) => {
    event.preventDefault();
    currentShip.leftButtonDown = true;
    currentShip.throttledLeftStart();
  };

  currentShip.leftButton.ontouchend = () => {
    currentShip.leftButtonDown = false;
    currentShip.stopMovingShip();
  };

  // Touch event handling for rightButton
  currentShip.rightButton.ontouchstart = (event) => {
    event.preventDefault();
    currentShip.rightButtonDown = true;
    currentShip.throttledRightStart();
  };

  currentShip.rightButton.ontouchend = () => {
    currentShip.rightButtonDown = false;
    currentShip.stopMovingShip();
  };
}

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 32) {
    // Spacebar key
    currentShip.shootRocket();
  }
});
