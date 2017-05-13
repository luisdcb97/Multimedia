"use strict";


let game = new Phaser.Game(800,600,Phaser.AUTO, 'Fisica');

game.state.add("MainGame", MainState);
game.state.start("MainGame");