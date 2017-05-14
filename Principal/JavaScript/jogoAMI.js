"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, "Nome");
var fundo;
var mesa;
var head;
var sprite1;
var timer, timerEvent, text;

let mainState = {
   preload: function () {
       game.load.image('fundo','../Recursos/fundo_jogoAMI.png');
       game.load.image('mesa','../Recursos/mesa1.png');
       game.load.image('head','../Recursos/topviewhead1.png');
   },

   create: function () {
       timer = game.time.create();
       timerEvent = timer.add(Phaser.Timer.MINUTE * 2 + Phaser.Timer.SECOND*0, this.endTimer, this);

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

       timer.start();


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
    },

    render: function () {
        if(timer.running){
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms)/1000)),2,14,"#fdfbff");
        }
        else{
            game.debug.text("Tempo terminado!",2,14,"#EF180D");
        }
    },
    endTimer: function () {
        timer.stop();
    },
    formatTime: function (s) {
        let minutos = "0" + Math.floor(s/60);
        let segundos = "0" + (s-minutos*60);
        return minutos.substr(-2)+":"+segundos.substr(-2);
    }
   
};

game.state.add('mainState',mainState);
game.state.start('mainState');