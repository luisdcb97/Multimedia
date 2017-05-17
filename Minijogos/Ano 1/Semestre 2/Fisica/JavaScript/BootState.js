"use strict";

let BootState = {
    preload: function () {
        gameFisica.scale.pageAlignHorizontally = true;
        gameFisica.scale.pageAlignVeritcally = true;
    },
    create: function () {
        gameFisica.physics.startSystem(Phaser.Physics.Arcade);
        gameFisica.state.start("IntroState");
    },

};