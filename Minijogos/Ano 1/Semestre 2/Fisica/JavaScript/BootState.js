"use strict";

let BootState = {
    create: function () {
        game.physics.startSystem(Phaser.Physics.Arcade);
        game.state.start(LoadState);
    },

};