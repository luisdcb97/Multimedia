"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, "Nome");
var fundo;
var mesa;
var head;
var sprite1;

let mainState = {
   preload: function () {
       game.load.image('fundo','../Recursos/fundo_jogoAMI.png');
       game.load.image('mesa','../Recursos/mesa1.png');
       game.load.image('head','../Recursos/topviewhead1.png');
   },

   create: function () {
       game.physics.startSystem(Phaser.Physics.ARCADE);

       fundo = game.add.tileSprite(0,0,800,600,'fundo');
       mesa = game.add.sprite(300,40, 'mesa');
       sprite1 = game.add.sprite(50,200,'head');

       game.physics.enable(sprite1, Phaser.Physics.ARCADE);
       sprite1.body.collideWorldBounds=true; //para o boneco não sair do ecrã
       //sprite1.body.checkCollision.up = false;
       //sprite1.body.checkCollision.down = false;
       //sprite1.body.immovable = true;

       game.physics.enable(mesa, Phaser.Physics.ARCADE);
       mesa.animations.play('run', 15, true);

   },
    update: function () {

        fundo.tilePosition.x +=2;


        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            sprite1.y += 15;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            sprite1.y -= 15;
        }
    }
   
};

game.state.add('mainState',mainState);
game.state.start('mainState');