"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, "Nome");
var fundo,mesa,integral;
var head;
var sprite1;
var timer, timerEvent, text, mensagem;
var pontos,pontuacao=0;
var  mesas =[];
var funcoes=[];


let mainState = {
   preload: function () {
       game.load.image('fundo','../Recursos/fundo_jogoAMI.png');
       game.load.image('mesa','../Recursos/mesa1.png');
       game.load.image('head','../Recursos/topviewhead1.png');
       game.load.image('integral', '../Recursos/integral.png');
       game.debug.text("Pontos: ",500,20,16,"#ffffff");
       game.load.image('mensagem', '../Recursos/ops..perdeu.png');

   },

   create: function () {
       timer = game.time.create();
       timerEvent = timer.add(Phaser.Timer.MINUTE * 2 + Phaser.Timer.SECOND*0, this.endTimer, this);

       game.physics.startSystem(Phaser.Physics.ARCADE);

       fundo = game.add.tileSprite(0,0,800,600,'fundo');
       sprite1 = game.add.sprite(50,200,'head');
       integral = game.add.sprite(400,300,'integral');


       game.physics.enable(sprite1, Phaser.Physics.ARCADE);
       sprite1.body.collideWorldBounds=true; //para o boneco não sair do ecrã

       timer.loop(3500, gerarMesas, this);
       game.physics.enable(integral, Phaser.Physics.ARCADE);
       integral.body.velocity.x = -90;
       timer.start();
       var style = { font: "20px Kristen ITC ", fill: "#ffffff" };
       pontos = game.add.text(550, 5, "Pontos: " + pontuacao,style);

   },
    update: function () {
        console.log(mesas);
        fundo.tilePosition.x -= 90 * game.time.physicsElapsed;

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            sprite1.y -= 200* game.time.physicsElapsed;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            sprite1.y += 200* game.time.physicsElapsed;
        }
        
        game.physics.arcade.collide(sprite1, mesas, jogadorPerde);
        game.physics.arcade.overlap(sprite1,integral, function () {
            ganhaPontos(sprite1, integral, pontos);
        });

        for (let i = 0;i<mesas.length; i++){
            if(mesas[i] !== undefined && mesas[i].x < 0 && !mesas[i].inWorld){
                mesas[i].destroy();
                mesas.splice(i,1);
                i--;
            }
        }

    },

    render: function () {
        if(timer.running){
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms)/1000)),20,20,"#ffffff");
        }
        else{
            game.debug.text("Tempo terminado!",20,20,"#EF180D");
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
function gerarMesas() {
    let pos = [];
    for (let i = 0; i < 3; i++) {
        pos.push(190*i+20);
    }
    for(let mesa of mesas){
        if(mesa.x > 600){
            pos.splice(pos.indexOf(mesa.y),1);
        }
    }
    if(pos.length === 0){
        return;
    }

    let mesa_pos = pos[Math.floor(Math.random() *pos.length)];
    let mesa_temp = game.add.sprite(900, mesa_pos, "mesa");
    game.physics.enable(mesa_temp, Phaser.Physics.ARCADE);
    mesa_temp.body.velocity.x = - 90;
    mesas.push(mesa_temp);
}
function jogadorPerde(mesa,aluno) {
    mensagem = game.add.sprite(300,150,'mensagem');
}
function ganhaPontos(mesa,funcao, texto) {
    pontuacao++;
    texto.setText("Pontos: " + pontuacao);
    funcao.kill();
}

game.state.add('mainState',mainState);
game.state.start('mainState');