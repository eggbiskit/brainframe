class GameOver extends Phaser.Scene {
    constructor() {
        super("gmScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', 'assets/select.wav');
        // load spritesheet 
        // TOOL: https://ezgif.com/gif-to-sprite
        this.load.spritesheet('go', './assets/go_sheet.png', {
            frameWidth: 923, 
            frameHeight: 773
        });
    }

    create() {
          var config = {
            key: "goAnimation",
            frames: this.anims.generateFrameNumbers("go", {
              start: 0,
              end: 1,
              first: 0
            }),
            frameRate: 6,
            repeat: -1
          };
  
          this.anims.create(config);
          var bg = this.add.sprite(0, 0, "go").play("goAnimation");
          bg.setOrigin(0,0);
  
          // define keys
          keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
          keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
          keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        // R for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        // ← for menu
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start('menuScene');    
        }
    }
}