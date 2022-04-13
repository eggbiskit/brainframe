class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    // var config = {
    //   type: Phaser.AUTO,
    //   width: 923,
    //   height: 773,
    //   parent: "phaser-example",
    //   scene: {
    //     preload: preload,
    //     create: create
    //   }
    // };

    //var game = new Phaser.Game(config);

    preloadTitle() {
      this.load.spritesheet("title", "assets/title_sheet.png", {
        frameWidth: 923,
        frameHeight: 773
      });
    }

    createTitle() {
      var config = {
        key: "titleAnimation",
        frames: this.anims.generateFrameNumbers("title", {
          start: 0,
          end: 7,
          first: 0
        }),
        frameRate: 7,
        repeat: -1
      };

      this.anims.create(config);
  //   var bg = this.add.sprite(0,0,"title");
  //   bg.setOrigin(0,0);
      var bg = this.add.sprite(0, 0, "title").play("titleAnimation");
      bg.setOrigin(0,0);
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', 'assets/select.wav');
        this.load.audio('sfx_explosion', 'assets/spaceship_exploding.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_firing.wav');
        // load title png
        this.load.image('title_png', './assets/title.png');
        // load spritesheet 
        // TOOL: https://ezgif.com/gif-to-sprite
        this.load.spritesheet('title', './assets/title_sheet.png', {
          frameWidth: 923, 
          frameHeight: 773
        });
    }

    create() {
      // menu text config
      let menuConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#000000', // title box color
          color: '#EE6EAB', // title text color
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00'; // bottom box color
        menuConfig.color = '#000'; // bottom text color
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}