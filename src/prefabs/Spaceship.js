// Spaceship prefab
// Spaceship behaviors - add spaceship/movement + wrapping
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        // store points
        this.points = pointValue;
        // pix per frame
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left to right edge
        if(this.x <= 0 - this.width) {
           this.reset(); 
        }
    }

    reset() {
        this.x = game.config.width;
    }
}