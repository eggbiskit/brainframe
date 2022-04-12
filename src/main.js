let config = {
    type: Phaser.CANVAS,
    width: 923,
    height: 773,
    scene: [ Menu, Play ]
}
  
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

