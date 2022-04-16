class Points extends Phaser.Scene {
    constructor() {
        super("pointsScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', 'assets/select.wav');
        this.load.audio('sfx_explosion', 'assets/spaceship_exploding.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_firing.wav');
        // load spritesheet 
        // TOOL: https://ezgif.com/gif-to-sprite
        this.load.spritesheet('points', './assets/points_sheet.png', {
            frameWidth: 923, 
            frameHeight: 773
        });
    }

    create() {
          var config = {
            key: "pointsAnimation",
            frames: this.anims.generateFrameNumbers("points", {
              start: 0,
              end: 8,
              first: 0
            }),
            frameRate: 7,
            repeat: -1
          };
  
          this.anims.create(config);
          var bg = this.add.sprite(0, 0, "points").play("pointsAnimation");
          bg.setOrigin(0,0);
  
          // define keys
          keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
          keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
          keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update() {
        // go to next scene
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
    }
}