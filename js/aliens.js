class Obstacle {
  constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      // Array of alien image paths
      this.alienImages = [
          './images/alienOne.png',
          './images/alienTwo.png',
          './images/alienThree.png',
          './images/alienFour.png',
          './images/alienFive.png',
      ];

      // Randomly select an alien image path
      this.img = this.randomAlienImage();

      this.destroyed = false;
      this.wasHit = false;
      this.explosionFrames = 10;
      this.currentExplosionFrame = 0;
      this.explosionImage = new Image();
      this.explosionImage.src = './images/explosion.png';

      // Bullet properties
    this.bulletWidth = 5;
    this.bulletHeight = 10;
    this.bulletX = this.x + this.width / 2 - this.bulletWidth / 2;
    this.bulletY = this.y + this.height;
    this.bulletSpeed = 3;
    this.shootBullet = false;
    this.initialBulletX = null;
    // A property to track when the next bullet should be fired
    this.nextBulletTime = Math.random() * 2000; // Initial random delay
    this.bulletDelay = 3000; // Time between bullet shots
  }

  // Helper function to select a random alien image
  randomAlienImage() {
      const randomIndex = Math.floor(Math.random() * this.alienImages.length);
      return this.alienImages[randomIndex];
  }

  drawObstacle() {
      if (this.wasHit && this.currentExplosionFrame < this.explosionFrames) {
          // Display the explosion image
          ctx.drawImage(
              this.explosionImage,
              this.x,
              this.y,
              this.width,
              this.height
          );
          this.currentExplosionFrame++;
      } else {
          // Draw the selected alien image
          const obstacleImg = new Image();
          obstacleImg.src = this.img;
          ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height);
      }
  }

  collidesWith(x, y) {
      return (
          x < this.x + this.width &&
          x + this.width > this.x &&
          y < this.y + this.height &&
          y + this.height > this.y
      );
  }

  destroy() {
      this.destroyed = true;
      this.wasHit = true;
  }

  shootDownwardBullet() {
    this.shootBullet = true;
    // Store the initial X position at the time of shooting
    if (this.initialX === undefined) {
      this.initialX = this.x + this.width / 2 - this.bulletWidth / 2;
    }
  }
  
  
   

  updateBullet() {
    if (this.shootBullet) {
      this.bulletY += this.bulletSpeed;
  
      // Draw the bullet using the initial X position
      ctx.fillStyle = 'white';
      ctx.fillRect(this.initialX, this.bulletY, this.bulletWidth, this.bulletHeight);
  
      // Check if the bullet hits the bottom of the canvas
      if (this.bulletY >= canvas.height) {
        this.shootBullet = false;
        this.bulletY = this.y + this.height; // Reset bullet position
      }
    }
  }
    
}
