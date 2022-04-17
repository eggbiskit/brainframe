class Difficulty extends Phaser.Scene {
    constructor() {
        super("diffScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', 'assets/select.wav');
        this.load.audio('sfx_explosion', 'assets/spaceship_exploding.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_firing.wav');
        // load spritesheet 
        // TOOL: https://ezgif.com/gif-to-sprite
        this.load.spritesheet('diff', './assets/choose_difficulty_sheet.png', {
            frameWidth: 923, 
            frameHeight: 773
          });
    }

    create() {
        var config = {
            key: "diffAnimation",
            frames: this.anims.generateFrameNumbers("diff", {
              start: 0,
              end: 2,
              first: 0
            }),
            frameRate: 6,
            repeat: -1
          };
  
          this.anims.create(config);
          var bg = this.add.sprite(0, 0, "diff").play("diffAnimation");
          bg.setOrigin(0,0);
  
          // define keys
          keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
          keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
          keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update() {
        // switched difficulty arrows bc of design
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // EXPERT MODE <-
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('tutorialScene');    
        }
        // N00B MODE ->
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
              spaceshipSpeed: 3,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('tutorialScene');
        }
    }
}