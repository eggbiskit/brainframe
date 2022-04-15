// preload images/position them/score tracking/
class Choose extends Phaser.Scene {
    constructor() {
        super("chooseScene");
    }
    preload() {
        // NEW: LOAD SPRITE IMAGES
        // load all cells
        this.load.image('internalscreaming', './assets/internalscreaming.png');
        this.load.image('rawrxd', './assets/rawrxd.png');
        this.load.image('leappul', './assets/leappul.png');
        this.load.image('uwu', './assets/uwu.png');
    }

    create() {
        // show cells
    }

    update() {
        // 
        // if (Phaser.Input.Keyboard.JustDown(keyENTER)){
        //     this.sound.play('sfx_select');
        //     this.scene.start('playScene');
        // }
    }
}