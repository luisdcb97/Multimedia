"use strict";

let BootState = {
    preload: function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVeritcally = true;
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.Arcade);
        game.state.start("IntroState");
    },

};