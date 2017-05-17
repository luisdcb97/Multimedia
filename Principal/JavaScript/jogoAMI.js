"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, "Nome");
var fundo,mesa,integral;
var head;
var sprite1;
var timer, timerEvent, text, mensagem;
var pontos,pontuacao=0;
var mesas =[];
var funcoes=[];
var jaJogou = 0;
var vsMesa,musica,vsIntegral,vit;

let mainState = {
   preload: function () {
       game.scale.pageAlignHorizontally = true;
       game.scale.pageAlignVeritcally = true;
       game.load.image('fundo','../Recursos/fundo_jogoAMI.png');
       game.load.image('mesa','../Recursos/mesa1.png');
       game.load.image('head','../Recursos/topviewhead1.png');
       game.load.image('integral', '../Recursos/integral.png');
       game.debug.text("Pontos: ",500,20,16,"#ffffff");
       game.load.image('mensagem', '../Recursos/popupderrota.png');
       game.load.image('funcao','../Recursos/funcao1.png');
       game.load.image('popupGanhou',"../Recursos/popupVitoriaJogoAMI.png");
       game.load.image('popupPerdeu',"../Recursos/popupDerrota.png");
       game.load.image('moeda',"../Recursos/moeda.png");

       game.load.image('botaoRepetir',"../Recursos/botaoREPETIR.png");
       game.load.image('botaoBAR',"../Recursos/botaoBAR.png");

       game.load.audio('integ', '../Recursos/cabosrodam.mp3');
       game.load.audio('mesa', '../Recursos/contrasecretaria.mp3');
       game.load.audio('musica', '../Recursos/musicaAMI.mp3');
       game.load.audio('vitoria', '../Recursos/vitoriaAMI.mp3');
   },

   create: function () {
       timer = game.time.create();
       timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND*0, this.jogadorGanha, this);

       vsIntegral = this.add.audio('integ');
       vsMesa = this.add.audio('mesa');
       vit = this.add.audio('vitoria');

       musica = this.add.audio('musica');
       musica.loop = true;
       musica.play();

       game.physics.startSystem(Phaser.Physics.ARCADE);

       fundo = game.add.tileSprite(0,0,800,600,'fundo');
       sprite1 = game.add.sprite(50,200,'head');


       game.physics.enable(sprite1, Phaser.Physics.ARCADE);
       sprite1.body.collideWorldBounds=true; //para o boneco não sair do ecrã

       timer.loop(2800, gerarMesas, this);
       timer.loop(3500, gerarFuncoes, this);


       timer.start();
       var style = { font: "20px Kristen ITC ", fill: "#ffffff" };
       pontos = game.add.text(550, 5, "Pontos: " + pontuacao,style);

   },
    update: function () {
        if(jaJogou == 0){
            fundo.tilePosition.x -= 120 * game.time.physicsElapsed;
            if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                sprite1.y -= 200* game.time.physicsElapsed;
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                sprite1.y += 200* game.time.physicsElapsed;
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                sprite1.x-= 200* game.time.physicsElapsed;
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                sprite1.x+= 200* game.time.physicsElapsed;
            }


            game.physics.arcade.collide(sprite1, mesas, jogadorPerde);

            for (let i = 0;i<funcoes.length; i++){
                if(funcoes[i] !== undefined && funcoes[i].x < 0 && !funcoes[i].inWorld){
                    funcoes[i].destroy();
                    funcoes.splice(i,1);
                    i--;
                }
                game.physics.arcade.overlap(sprite1, funcoes[i], function () {
                    ganhaPontos(sprite1, funcoes[i], pontos);
                });
            }
            for (let i = 0;i<mesas.length; i++){
                if(mesas[i] !== undefined && mesas[i] !== null && mesas[i].x < 0 && !mesas[i].inWorld){
                    mesas[i].destroy();
                    mesas.splice(i,1);
                    i--;
                }
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
    jogadorGanha: function () {
        vit.play();
        jaJogou = 1;
        musica.pause();
        musica.currentTime = 0;
        timer.stop();
        for(let i = 0; i < mesas.length; i++){
            mesas[i].destroy();
        }
        for(let i = 0; i < funcoes.length; i++){
            funcoes[i].destroy();
        }
        sprite1.destroy();
        let popupG = this.add.sprite(100, 90, 'popupGanhou');
        popupG.alpha = 0;
        let valor = 0;
        game.add.tween(popupG).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

        if (pontuacao>9){
            let vicText = game.add.text(230,166, 'Pontos: '+pontuacao+',     +'+4, {font: "40px Kristen ITC", fill: "#fbb117"});
        }
        else if(pontuacao>5){
            let vicText = game.add.text(230,166, 'Pontos: '+pontuacao+',     +'+3, {font: "40px Kristen ITC", fill: "#fbb117"});
        }
        else{
            let vicText = game.add.text(230,166, 'Pontos: '+pontuacao+',     +'+2, {font: "40px Kristen ITC", fill: "#fbb117"});
        }
        let popupMoeda = this.add.sprite(550,178,'moeda');
        popupMoeda.alpha = 0;
        game.add.tween(popupMoeda).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

        this.botaoRepetir = this.add.sprite(265,315,'botaoRepetir');
        this.botaoRepetir.alpha = 0;
        game.add.tween(this.botaoRepetir).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        this.botaoBAR = this.add.sprite(430,315,'botaoBAR');
        this.botaoBAR.alpha = 0;
        game.add.tween(this.botaoBAR).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        this.botaoRepetir.inputEnabled = true;
        this.botaoBAR.inputEnabled = true;
        this.botaoRepetir.events.onInputOver.add(function () {
            this.botaoRepetir.tint = 0xd17f35;
        },this);
        this.botaoRepetir.events.onInputOut.add(function () {
            this.botaoRepetir.tint = 0xffffff;
        },this);
        this.botaoBAR.events.onInputOver.add(function () {
            this.botaoBAR.tint = 0xd17f35;
        },this);
        this.botaoBAR.events.onInputOut.add(function () {
            this.botaoBAR.tint = 0xffffff;
        },this);
        pontuacao =  0;
        this.botaoRepetir.events.onInputDown.add(repeteJogo);
        this.botaoBAR.events.onInputDown.add(vaiParaOBar);
    },
    formatTime: function (s) {
        let minutos = "0" + Math.floor(s/60);
        let segundos = "0" + (s-minutos*60);
        return minutos.substr(-2)+":"+segundos.substr(-2);
    }

};

function gerarMesas() {
    if (jaJogou == 0){
        let pos = [];
        for (let i = 0; i < 3; i++) {
            pos.push(185*i+10);
        }
        for(let mesa of mesas){
            if(mesa.x > 600){
                pos.splice(pos.indexOf(mesa.y),1);
            }
        }
        for(let func of funcoes){
            if(func.x > 600){
                pos.splice(pos.indexOf(func.y),1);
            }
        }
        if(pos.length === 0){
            return;
        }

        let mesa_pos = pos[Math.floor(Math.random() *pos.length)];
        let mesa_temp = game.add.sprite(1000, mesa_pos, "mesa");
        game.physics.enable(mesa_temp, Phaser.Physics.ARCADE);
        mesa_temp.body.velocity.x = - 120;
        mesas.push(mesa_temp);
    }

}

function gerarFuncoes(){
    if (jaJogou == 0){

        let pos=[];
        for (let i = 0; i < 3; i++){
            pos.push(185*i+10);
        }

        for(let mesa of mesas){
            if(mesa.x > 600){
                if (jaJogou == 0){
                    pos.splice(pos.indexOf(mesa.y),1);
                }

            }
        }
        for(let f of funcoes){
            if(f.x > 600){
                if(jaJogou == 0) {
                    pos.splice(pos.indexOf(f.y), 1);
                }
            }
        }
        if(pos.length === 0){
            return;
        }
        let f_pos = pos[Math.floor(Math.random() *pos.length)];
        let f_temp = game.add.sprite(900, f_pos, "integral");
        game.physics.enable(f_temp, Phaser.Physics.ARCADE);
        f_temp.body.velocity.x = - 120;
        funcoes.push(f_temp);
    }


}
/*
function jogadorPerde(mesa,aluno) {
    mensagem = game.add.sprite(100,150,'mensagem');
    game.gamePaused();
}*/
var a = 0;
function jogadorPerde(){
    if (a==0){
        for(let i = 0; i < mesas.length; i++){
            mesas[i].destroy();
        }
        for(let i = 0; i < funcoes.length; i++){
            funcoes[i].destroy();
        }

        musica.pause();
        musica.currentTime = 0;
        vsMesa.play();
        pontuacao = 0;
        sprite1.destroy();
        timer.stop();
        jaJogou = 1;
        let popupD = game.add.sprite(100, 90, 'popupPerdeu');
        popupD.alpha = 0;
        game.add.tween(popupD).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0);
        game.botaoRepetir = game.add.sprite(265, 315, 'botaoRepetir');
        game.botaoRepetir.alpha = 0;
        game.add.tween(game.botaoRepetir).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0);
        game.botaoBAR = game.add.sprite(430, 315, 'botaoBAR');
        game.botaoBAR.alpha = 0;
        game.add.tween(game.botaoBAR).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0);
        game.botaoRepetir.inputEnabled = true;
        game.botaoBAR.inputEnabled = true;
        game.botaoRepetir.events.onInputOver.add(function () {
            game.botaoRepetir.tint = 0xd17f35;
        }, game);
        game.botaoRepetir.events.onInputOut.add(function () {
            game.botaoRepetir.tint = 0xffffff;
        }, game);
        game.botaoBAR.events.onInputOver.add(function () {
            game.botaoBAR.tint = 0xd17f35;
        }, game);
        game.botaoBAR.events.onInputOut.add(function () {
            game.botaoBAR.tint = 0xffffff;
        }, game);
        game.botaoRepetir.events.onInputDown.add(repeteJogo);
        game.botaoBAR.events.onInputDown.add(vaiParaOBar);
        a = 1;
    }
}
function ganhaPontos(mesa,funcao, texto) {
    vsIntegral.play();
    pontuacao++;
    texto.setText("Pontos: " + pontuacao);
    funcao.kill();
}
function repeteJogo() {
    game.state.restart();
    jaJogou = 0;
    a = 0;
    mesas = [];
    funcoes = [];
}
function vaiParaOBar() {

}
game.state.add('mainState',mainState);
game.state.start('mainState');