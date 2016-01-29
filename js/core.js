var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
//All game states
game.state.add("GameLevel1", gameLevel1);
//Initial state
game.state.start("GameLevel1");