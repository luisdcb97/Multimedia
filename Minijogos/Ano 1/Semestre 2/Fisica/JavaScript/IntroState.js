"use strict";

let IntroState = {
    preload: function () {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVeritcally = true;
        this.load.image('introFisica',"../Recursos/introFisica.png");
    },
    create: function () {
        let title = game.add.sprite(0,0, "introFisica");
        game.time.events.add(Phaser.Timer.SECOND * 10, function () {
            // game.state.start("LoadState");
            game.state.start("PlayState");
        }, this);
    },

};