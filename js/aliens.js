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
}
