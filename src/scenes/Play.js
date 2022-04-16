// preload images/position them/score tracking
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.p1s1 = false;
        this.p1s2 = false;
        this.p1s3 = false;
        this.p2s1 = false;
        this.p2s2 = false;
        this.p2s3 = false;
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('bg', './assets/bg.png');
        // cells
        this.load.image('leappul', './assets/leappul.png');
        this.load.image('internalscreaming', './assets/internalscreaming.png');
        this.load.image('rawrxd', './assets/rawrxd.png');
        this.load.image('uwu', './assets/uwu.png');
        // enemies
        this.load.image('sadbat', './assets/sadbat.png');
        this.load.image('badappul', './assets/badappul.png');
        this.load.image('tauntme', './assets/tauntme.png');
        // custom ui
        this.load.image('topbar', './assets/topbar.png');
        this.load.image('bottombar', './assets/bottombar.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion_sheet.png', {frameWidth: 70, frameHeight: 39, startFrame: 0, endFrame: 9});
    }

    create() {
        // NEW: CHANGE BG √
        this.bg = this.add.tileSprite(0, 0, 923, 773, 'bg').setOrigin(0, 0);
        // NEW: CHANGE BORDER LOOK √
        // left
        this.add.rectangle(0, 0, borderUISize/8, game.config.height, 0x4D4444).setOrigin(0, 0);
        // right
        this.add.rectangle(917, 0, borderUISize/8, game.config.height, 0x4D4444).setOrigin(0, 0);
        // top  
        this.add.image(0,0, 'topbar').setOrigin(0, 0);
        // bottom
        this.add.image(0,750, 'bottombar').setOrigin(0, 0);
        // NEW: ADDED EXTRA ROCKET √
        // add rockets (p1, p2)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'internalscreaming').setOrigin(3, 0.5);
        this.p2Rocket = new Rocket2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'uwu').setOrigin(-1, 0.5);
        // NEW: CHANGE SPACESHIP LOOK
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'tauntme', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'badappul', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'sadbat', 0, 10).setOrigin(0,0);
        // NEW: ADD A AND D KEYS FOR P1, UP FOR P2 √
        // define keys 
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // NEW: UPDATE EXPLOSION ANIMATION
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // NEW: UPDATE AND SHOW SCORE FOR P2 
        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // display box
        // p1 
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FC66FF',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        // p2
        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#aaaaaa',
            color: '#FC66FF',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }

        // display scores √
        // p1
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // p2
        this.scoreLeft2 = this.add.text(borderUISize + borderPadding + 700, borderUISize + borderPadding*2, this.p2Score, scoreConfig2);
        
        // NEW: UPDATE GAME OVER - MAKE SEP SCENE
        // GAME OVER flag
        this.gameOver = false;
        // NEW: DISPLAY TIME REMAINING 
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }



    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.bg.tilePositionX -= 4; // makes bg move or "scroll" to the right

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.p2Rocket.update();         // update rocket sprite

            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        }
        // NEW: ADD ROCKET COLLISION CHECK FOR ROCKET 2 √
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.p1s3 = true;
            this.shipExplode(this.ship03);   
        }
        else if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.p1s2 = true;
            this.shipExplode(this.ship02);
        }
        else if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.p1s1 = true;
            this.shipExplode(this.ship01);
        }
        // NEW: p2 rocket checks
        else if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.p2s3 = true;
            this.shipExplode(this.ship03);   
        }
        else if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.p2s2 = true;
            this.shipExplode(this.ship02);
        }
        else if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.p2s1 = true;
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });    

        // NEW: need to check which rocket hit which ship
        if(this.p1s1) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score; 
        }
        else if(this.p1s2) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;  
        }
        else if(this.p1s3) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;  
        }
        else if(this.p2s1) {
            this.p2Score += ship.points;
            this.scoreLeft2.text = this.p2Score;  
        }
        else if(this.p2s2) {
            this.p2Score += ship.points;
            this.scoreLeft2.text = this.p2Score;  
        }
        else if(this.p2s3) {
            this.p2Score += ship.points;
            this.scoreLeft2.text = this.p2Score;  
        }
        this.p1s1 = false;
        this.p1s2 = false;
        this.p1s3 = false;
        this.p2s1 = false;
        this.p2s2 = false;
        this.p2s3 = false;
        this.sound.play('sfx_explosion');
    }
}