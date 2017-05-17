"use strict";

let IntroState = {
    preload: function () {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVeritcally = true;
        this.load.image('introFisica',"../Recursos/introFisica.png");
    },
    create: function () {
        gameFisica.add.button(0,0, "introFisica", this.comecaJogo, this);
    },
    comecaJogo: function (button, pointer) {
        gameFisica.state.start("PlayState");
    }
};
