// Grace Ho
// game: "brainframe", built off Nathan Altice's "Rocket Patrol" tutorial
// time spent: ≥25 hours

let config = {
    type: Phaser.CANVAS,
    width: 923,
    height: 773,
    autoCenter: true, // SRC: https://phaser.discourse.group/t/center-game-on-my-website/5921
    scene: [ Menu, Difficulty, Tutorial, Points, Play, GameOver ] // AAAHHH i forgot to add new scenes here
}
  
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyA, keyD, keyLEFT, keyRIGHT, keyENTER, keySHIFT, keyUP; // also always forgot to add new keys too
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

/* POINT BREAKDOWN + JUSTIFICATION
1. Implement a simultaneous two-player mode (30)
  - player 1 uses keys A and D to move, F to fire
  - player 2 uses left and right arrows keys to move, up arrow key to fire
  - scores are on left and right sides for p1 and p2 respectively

2. Redesign the game's artwork, UI, and sound to change 
   its theme/aesthetic (to something other than sci-fi) (60)
  - play as brain cells to destroy negative thoughts
  - ui is on theme - new menu scenes, new borders, new info scenes, new game over scene
  - sound effects + music are cute n simple

3. Display the time remaining (in seconds) on the screen (10)
  - time is in the middle of the screen
  - 45 sec for expert, 60 sec for n00b

TOTAL: 30 + 60 + 10 = 100
*/
