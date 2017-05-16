"use strict";

let IntroState = {
    create: function () {
        let style = { font: "14px Arial", fill: "#ff0044", align: "center" };
        this.text = game.add.text(game.world.centerX, game.world.centerY*1.3, "PlayState", style);
        this.text.anchor.set(0.5);
    },

};