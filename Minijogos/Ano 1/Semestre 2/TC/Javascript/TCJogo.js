"use strict";


let game = new Phaser.Game(800,540,Phaser.AUTO, 'TC');
let xs = [];
let i;

let gameState = {
    preload: function () {
        game.load.image('fundo', "../../../../../Principal/Recursos/arduinoFundo.jpg");
        game.load.image('cabo1', "../../../../../Principal/Recursos/caboArduinoAmarelo.png");
        game.load.image('cabo2', "../../../../../Principal/Recursos/caboArduinoAzul.png");
        game.load.image('cabo3', "../../../../../Principal/Recursos/caboArduinoVermelho.png");
        game.load.image('cabo4', "../../../../../Principal/Recursos/caboArduinoAmarelo90Graus.png");
        game.load.image('cabo5', "../../../../../Principal/Recursos/caboArduinoAzul90Graus.png");
        game.load.image('cabo6', "../../../../../Principal/Recursos/caboArduinoVermelho90Graus.png");
        game.load.image('inicial', "../../../../../Principal/Recursos/caboArduinoInicial.png");
        game.load.image('final', "../../../../../Principal/Recursos/caboArduinoFinal.png");
        game.load.image('ledApagado', "../../../../../Principal/Recursos/ledArduino.png");
        game.load.image('ledLigado', "../../../../../Principal/Recursos/ledArduinoLigado.png");

    },
    create: function () {
        var s = game.add.sprite(0, 0, 'fundo');
        var cab = game.add.sprite(100, 98, 'inicial');
        var cab = game.add.sprite(100+9*54, 250, 'final');
        for (let i = 0; i < 8; i++) {
            var cab = game.add.sprite(154+i*54, 98, 'cabo'+Math.floor(Math.random()*5+1));
        }
        for (let i = 1; i < 9; i++) {
            var cab = game.add.sprite(100+i*54, 152, 'cabo'+Math.floor(Math.random()*5+1));
        }
        for (let i = 1; i < 9; i++) {
            var cab = game.add.sprite(100+i*54, 196, 'cabo'+Math.floor(Math.random()*5+1));
        }
        for (let i = 1; i < 9; i++) {
            var cab = game.add.sprite(100+i*54, 250, 'cabo'+Math.floor(Math.random()*5+1));
        }
        var led = game.add.sprite(329,356,'ledApagado');
    }
};


game.state.add("MainGame", gameState);
game.state.start("MainGame");


