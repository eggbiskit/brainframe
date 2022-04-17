// Rocket prefab
// Rocket behaviors - adding rocket to scene/firing rocket
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    preload() {
        this.load.spritesheet('internalscreaming', './assets/internalscreaming_sheet.png', {frameWidth: 117, frameHeight: 100, startFrame: 0, endFrame: 1});

    }

    create() {
        var config1 = {
            key: "internalscreamingAnimation",
            frames: this.anims.generateFrameNumbers("internalscreaming", {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 6,
            repeat: -1
        };
        this.anims.create(config);
        // this.anims.create(config2);
        var internal_var = this.add.sprite(0, 0, "internalscreaming").play("internalscreamingAnimation");
        // var uwu_var = this.add.sprite(0, 0, "uwu").play("uwuAnimation");
        internal_var.play("internalscreamingAnimation");
        // uwu_var.play("uwuAnimation");
    }

    update() {
        if(!this.isFiring) { // NEW: A and D to move P1
            // if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            //     this.x -= this.moveSpeed;
            // } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            //     this.x += this.moveSpeed;
            // }
            if(keyA.isDown && this.x >= borderUISize + this.width) {
               this.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
               this.x += this.moveSpeed;
            }
        }

        // fire button NEW: P1 uses F to fire
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }

        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}