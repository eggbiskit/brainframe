let config = {
    type: Phaser.CANVAS,
    width: 923,
    height: 773,
    autoCenter: true, // SRC: https://phaser.discourse.group/t/center-game-on-my-website/5921
    scene: [ Menu, Difficulty, Choose, Play ] // AAAHHH i forgot to add new scenes here
}
  
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyA, keyD, keyLEFT, keyRIGHT, keyENTER, keySHIFT, keyUP;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

