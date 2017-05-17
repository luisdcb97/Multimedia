"use strict";

var gameAMI = new Phaser.Game(800, 600, Phaser.AUTO, "Nome");
var fundoAMI,mesaAMI,integralAMI;
var headAMI;
var sprite1AMI;
var timerAMI, timerEventAMI, textAMI, mensagemAMI;
var pontosAMI,pontuacaoAMI=0;
var mesasAMI =[];
var funcoesAMI=[];
var jaJogouAMI = 0;
var vsMesaAMI,musicaAMI,vsIntegralAMI,vitAMI;

let mainStateAMI = {
   preload: function () {
       gameAMI.scale.pageAlignHorizontally = true;
       gameAMI.scale.pageAlignVeritcally = true;
       gameAMI.load.image('fundoAMI','../Recursos/fundo_jogoAMI.png');
       gameAMI.load.image('mesaAMI','../Recursos/mesa1.png');
       gameAMI.load.image('headAMI','../Recursos/topviewhead1.png');
       gameAMI.load.image('integralAMI', '../Recursos/integral.png');
       gameAMI.debug.text("Pontos: ",500,20,16,"#ffffff");
       gameAMI.load.image('mensagemAMI', '../Recursos/popupderrota.png');
       gameAMI.load.image('funcao','../Recursos/funcao1.png');
       gameAMI.load.image('popupGanhou',"../Recursos/popupVitoriaJogoAMI.png");
       gameAMI.load.image('popupPerdeu',"../Recursos/popupDerrota.png");
       gameAMI.load.image('moeda',"../Recursos/moeda.png");

       gameAMI.load.image('botaoRepetir',"../Recursos/botaoREPETIR.png");
       gameAMI.load.image('botaoBAR',"../Recursos/botaoBAR.png");

       gameAMI.load.audio('integ', '../Recursos/cabosrodam.mp3');
       gameAMI.load.audio('mesaAMI', '../Recursos/contrasecretaria.mp3');
       gameAMI.load.audio('musicaAMI', '../Recursos/musicaAMI.mp3');
       gameAMI.load.audio('vitoria', '../Recursos/vitoriaAMI.mp3');
   },

   create: function () {
       timerAMI = gameAMI.time.create();
       timerEventAMI = timerAMI.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND*0, this.jogadorGanha, this);

       vsIntegralAMI = this.add.audio('integ');
       vsMesaAMI = this.add.audio('mesaAMI');
       vitAMI = this.add.audio('vitoria');

       musicaAMI = this.add.audio('musicaAMI');
       musicaAMI.loop = true;
       musicaAMI.play();

       gameAMI.physics.startSystem(Phaser.Physics.ARCADE);

       fundoAMI = gameAMI.add.tileSprite(0,0,800,600,'fundoAMI');
       sprite1AMI = gameAMI.add.sprite(50,200,'headAMI');


       gameAMI.physics.enable(sprite1AMI, Phaser.Physics.ARCADE);
       sprite1AMI.body.collideWorldBounds=true; //para o boneco não sair do ecrã

       timerAMI.loop(2800, gerarMesas, this);
       timerAMI.loop(3500, gerarFuncoes, this);


       timerAMI.start();
       var style = { font: "20px Kristen ITC ", fill: "#ffffff" };
       pontosAMI = gameAMI.add.text(550, 5, "Pontos: " + pontuacaoAMI,style);

   },
    update: function () {
        if(jaJogouAMI == 0){
            fundoAMI.tilePosition.x -= 120 * gameAMI.time.physicsElapsed;
            if (gameAMI.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                sprite1AMI.y -= 200* gameAMI.time.physicsElapsed;
            }
            else if (gameAMI.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                sprite1AMI.y += 200* gameAMI.time.physicsElapsed;
            }
            else if (gameAMI.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                sprite1AMI.x-= 200* gameAMI.time.physicsElapsed;
            }
            else if (gameAMI.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                sprite1AMI.x+= 200* gameAMI.time.physicsElapsed;
            }


            gameAMI.physics.arcade.collide(sprite1AMI, mesasAMI, jogadorPerde);

            for (let i = 0; i<funcoesAMI.length; i++){
                if(funcoesAMI[i] !== undefined && funcoesAMI[i].x < 0 && !funcoesAMI[i].inWorld){
                    funcoesAMI[i].destroy();
                    funcoesAMI.splice(i,1);
                    i--;
                }
                gameAMI.physics.arcade.overlap(sprite1AMI, funcoesAMI[i], function () {
                    ganhaPontos(sprite1AMI, funcoesAMI[i], pontosAMI);
                });
            }
            for (let i = 0; i<mesasAMI.length; i++){
                if(mesasAMI[i] !== undefined && mesasAMI[i] !== null && mesasAMI[i].x < 0 && !mesasAMI[i].inWorld){
                    mesasAMI[i].destroy();
                    mesasAMI.splice(i,1);
                    i--;
                }
            }
        }
    },
    render: function () {
        if(timerAMI.running){
            gameAMI.debug.text(this.formatTime(Math.round((timerEventAMI.delay - timerAMI.ms)/1000)),20,20,"#ffffff");
        }
        else{
            gameAMI.debug.text("Tempo terminado!",20,20,"#EF180D");
        }


    },
    jogadorGanha: function () {
        vitAMI.play();
        jaJogouAMI = 1;
        musicaAMI.pause();
        musicaAMI.currentTime = 0;
        timerAMI.stop();
        for(let i = 0; i < mesasAMI.length; i++){
            mesasAMI[i].destroy();
        }
        for(let i = 0; i < funcoesAMI.length; i++){
            funcoesAMI[i].destroy();
        }
        sprite1AMI.destroy();
        let popupG = this.add.sprite(100, 90, 'popupGanhou');
        popupG.alpha = 0;
        let valor = 0;
        gameAMI.add.tween(popupG).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

        if (pontuacaoAMI>9){
            let vicText = gameAMI.add.text(230,166, 'Pontos: '+pontuacaoAMI+',     +'+4, {font: "40px Kristen ITC", fill: "#fbb117"});
        }
        else if(pontuacaoAMI>5){
            let vicText = gameAMI.add.text(230,166, 'Pontos: '+pontuacaoAMI+',     +'+3, {font: "40px Kristen ITC", fill: "#fbb117"});
        }
        else{
            let vicText = gameAMI.add.text(230,166, 'Pontos: '+pontuacaoAMI+',     +'+2, {font: "40px Kristen ITC", fill: "#fbb117"});
        }
        let popupMoeda = this.add.sprite(550,178,'moeda');
        popupMoeda.alpha = 0;
        gameAMI.add.tween(popupMoeda).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

        this.botaoRepetir = this.add.sprite(265,315,'botaoRepetir');
        this.botaoRepetir.alpha = 0;
        gameAMI.add.tween(this.botaoRepetir).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        this.botaoBAR = this.add.sprite(430,315,'botaoBAR');
        this.botaoBAR.alpha = 0;
        gameAMI.add.tween(this.botaoBAR).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
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
        pontuacaoAMI =  0;
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
    if (jaJogouAMI == 0){
        let pos = [];
        for (let i = 0; i < 3; i++) {
            pos.push(185*i+10);
        }
        for(let mesa of mesasAMI){
            if(mesa.x > 600){
                pos.splice(pos.indexOf(mesa.y),1);
            }
        }
        for(let func of funcoesAMI){
            if(func.x > 600){
                pos.splice(pos.indexOf(func.y),1);
            }
        }
        if(pos.length === 0){
            return;
        }

        let mesa_pos = pos[Math.floor(Math.random() *pos.length)];
        let mesa_temp = gameAMI.add.sprite(1000, mesa_pos, "mesaAMI");
        gameAMI.physics.enable(mesa_temp, Phaser.Physics.ARCADE);
        mesa_temp.body.velocity.x = - 120;
        mesasAMI.push(mesa_temp);
    }

}

function gerarFuncoes(){
    if (jaJogouAMI == 0){

        let pos=[];
        for (let i = 0; i < 3; i++){
            pos.push(185*i+10);
        }

        for(let mesa of mesasAMI){
            if(mesa.x > 600){
                if (jaJogouAMI == 0){
                    pos.splice(pos.indexOf(mesa.y),1);
                }

            }
        }
        for(let f of funcoesAMI){
            if(f.x > 600){
                if(jaJogouAMI == 0) {
                    pos.splice(pos.indexOf(f.y), 1);
                }
            }
        }
        if(pos.length === 0){
            return;
        }
        let f_pos = pos[Math.floor(Math.random() *pos.length)];
        let f_temp = gameAMI.add.sprite(900, f_pos, "integralAMI");
        gameAMI.physics.enable(f_temp, Phaser.Physics.ARCADE);
        f_temp.body.velocity.x = - 120;
        funcoesAMI.push(f_temp);
    }


}
/*
function jogadorPerde(mesaAMI,aluno) {
    mensagemAMI = gameAMI.add.sprite(100,150,'mensagemAMI');
    gameAMI.gamePaused();
}*/
var a = 0;
function jogadorPerde(){
    if (a==0){
        for(let i = 0; i < mesasAMI.length; i++){
            mesasAMI[i].destroy();
        }
        for(let i = 0; i < funcoesAMI.length; i++){
            funcoesAMI[i].destroy();
        }

        musicaAMI.pause();
        musicaAMI.currentTime = 0;
        vsMesaAMI.play();
        pontuacaoAMI = 0;
        sprite1AMI.destroy();
        timerAMI.stop();
        jaJogouAMI = 1;
        let popupD = gameAMI.add.sprite(100, 90, 'popupPerdeu');
        popupD.alpha = 0;
        gameAMI.add.tween(popupD).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0);
        gameAMI.botaoRepetir = gameAMI.add.sprite(265, 315, 'botaoRepetir');
        gameAMI.botaoRepetir.alpha = 0;
        gameAMI.add.tween(gameAMI.botaoRepetir).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0);
        gameAMI.botaoBAR = gameAMI.add.sprite(430, 315, 'botaoBAR');
        gameAMI.botaoBAR.alpha = 0;
        gameAMI.add.tween(gameAMI.botaoBAR).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0);
        gameAMI.botaoRepetir.inputEnabled = true;
        gameAMI.botaoBAR.inputEnabled = true;
        gameAMI.botaoRepetir.events.onInputOver.add(function () {
            gameAMI.botaoRepetir.tint = 0xd17f35;
        }, gameAMI);
        gameAMI.botaoRepetir.events.onInputOut.add(function () {
            gameAMI.botaoRepetir.tint = 0xffffff;
        }, gameAMI);
        gameAMI.botaoBAR.events.onInputOver.add(function () {
            gameAMI.botaoBAR.tint = 0xd17f35;
        }, gameAMI);
        gameAMI.botaoBAR.events.onInputOut.add(function () {
            gameAMI.botaoBAR.tint = 0xffffff;
        }, gameAMI);
        gameAMI.botaoRepetir.events.onInputDown.add(repeteJogo);
        gameAMI.botaoBAR.events.onInputDown.add(vaiParaOBar);
        a = 1;
    }
}
function ganhaPontos(mesa,funcao, texto) {
    vsIntegralAMI.play();
    pontuacaoAMI++;
    texto.setText("Pontos: " + pontuacaoAMI);
    funcao.kill();
}
function repeteJogo() {
    gameAMI.state.restart();
    jaJogouAMI = 0;
    a = 0;
    mesasAMI = [];
    funcoesAMI = [];
}
function vaiParaOBar() {

}
gameAMI.state.add('mainStateAMI',mainStateAMI);