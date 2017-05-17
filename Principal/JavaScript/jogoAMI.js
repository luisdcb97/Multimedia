"use strict";

var gameAMI = new Phaser.Game(800, 600, Phaser.AUTO, "Jogo");
var fundoAMI,mesaAMI,integralAMI;
var headAMI;
var sprite1AMI;
var timerAMI, timerEventAMI, textAMI, mensagemAMI;
var pontosAMI,pontuacaoAMI=0;
var mesasAMI =[];
var funcoesAMI=[];
var jaJogouAMI = 0;
var vsMesaAMI,musicaAMI,vsIntegralAMI,vitAMI;

var introStateAMI ={
    preload:function () {
        if(typeof resourcePrefix === 'undefined'){
            this.resourcePrefix = "../";
        }
        else{
            this.resourcePrefix = resourcePrefix;
        }

        this.load.image('introAMI', this.resourcePrefix + "Recursos/introAMI.png");
    },
    create: function () {
        gameAMI.add.button(0,0, "introAMI", this.comecaJogo, this);
    },
    comecaJogo: function (button, pointer) {
        gameAMI.state.start("mainStateAMI");
    }
};


let mainStateAMI = {
   preload: function () {
       if(typeof resourcePrefix === 'undefined'){
           this.resourcePrefix = "../";
       }
       else{
           this.resourcePrefix = resourcePrefix;
       }

       gameAMI.scale.pageAlignHorizontally = true;
       gameAMI.scale.pageAlignVeritcally = true;
       gameAMI.load.image('fundoAMI',this.resourcePrefix + "Recursos/fundo_jogoAMI.png");
       gameAMI.load.image('mesaAMI',this.resourcePrefix + "Recursos/mesa1.png");
       gameAMI.load.image('headAMI',this.resourcePrefix + "Recursos/topviewhead1.png");
       gameAMI.load.image('integralAMI', this.resourcePrefix + "Recursos/integral.png");
       gameAMI.debug.text("Pontos: ",500,20,16,"#ffffff");
       gameAMI.load.image('mensagemAMI', this.resourcePrefix + "Recursos/popupderrota.png");
       gameAMI.load.image('funcao',this.resourcePrefix + "Recursos/funcao1.png");
       gameAMI.load.image('popupGanhou',this.resourcePrefix + "Recursos/popupVitoriaJogoAMI.png");
       gameAMI.load.image('popupPerdeu',this.resourcePrefix + "Recursos/popupDerrota.png");
       gameAMI.load.image('moeda',this.resourcePrefix + "Recursos/moeda.png");

       gameAMI.load.image('botaoRepetir',this.resourcePrefix + "Recursos/botaoREPETIR.png");
       gameAMI.load.image('botaoBAR',this.resourcePrefix + "Recursos/botaoBAR.png");

       gameAMI.load.audio('integ', this.resourcePrefix + "Recursos/apanhafuncao.mp3");
       gameAMI.load.audio('mesaAMI', this.resourcePrefix + "Recursos/contrasecretaria.mp3");
       gameAMI.load.audio('musicaAMI', this.resourcePrefix + "Recursos/musicaAMI.wav");
       gameAMI.load.audio('vitoria', this.resourcePrefix + "Recursos/vitoriaAMI.mp3");
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

       timerAMI.loop(2800, function () {
           gerarMesas();
           gerarMesas();
           let str = "Mesas: [" + mesasAMI.length +"]\n";
           for (let mesa of mesasAMI) {
               str+="x: "+mesa.x+"\ty: "+mesa.y+"\n"
           }
           console.log(str+"\n");
       }, this);
       timerAMI.add(0, function () {
           timerAMI.loop(2800, function () {
               gerarFuncoes();

               let str = "Funcoes: [" + funcoesAMI.length +"]\n";
               for (let funcao of funcoesAMI) {
                   str+="x: "+funcao.x+"\ty: "+funcao.y+"\n"
               }
               console.log(str+"\n");
           },
           this)}
       ,this);

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
                if(funcoesAMI[i] !== undefined && funcoesAMI[i].x < 0/* && !funcoesAMI[i].inWorld*/){
                    funcoesAMI[i].destroy();
                    funcoesAMI.splice(i,1);
                    i--;
                }
                gameAMI.physics.arcade.overlap(sprite1AMI, funcoesAMI[i], function () {
                    ganhaPontos(sprite1AMI, funcoesAMI[i], pontosAMI);
                });
            }
            for (let i = 0; i<mesasAMI.length; i++){
                if(mesasAMI[i] !== undefined && mesasAMI[i] !== null && mesasAMI[i].x < 0 /*&& !mesasAMI[i].inWorld*/){
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
            valor = 4;
            let vicText = gameAMI.add.text(230,166, 'Pontos: '+pontuacaoAMI+',     +'+4, {font: "40px Kristen ITC", fill: "#fbb117"});
        }
        else if(pontuacaoAMI>5){
            valor = 3;
            let vicText = gameAMI.add.text(230,166, 'Pontos: '+pontuacaoAMI+',     +'+3, {font: "40px Kristen ITC", fill: "#fbb117"});
        }
        else{
            valor = 2;
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
        this.botaoBAR.events.onInputDown.add(vaiParaOBar, this, 0, valor);
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
            pos.push(185*i+18);
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
            pos.push(185*i+18);
        }

        for(let mesa of mesasAMI){
            if(mesa.x > 600){
                pos.splice(pos.indexOf(mesa.y),1);
            }
        }
        for(let f of funcoesAMI){
            if(f.x > 600){
                pos.splice(pos.indexOf(f.y), 1);

            }
        }
        if(pos.length === 0){
            return;
        }
        let f_pos = pos[Math.floor(Math.random() *pos.length)];
        let f_temp = gameAMI.add.sprite(1000, f_pos, "integralAMI");
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
        gameAMI.botaoBAR.events.onInputDown.add(vaiParaOBar, this, 0, 0);
        a = 1;
    }
}
function ganhaPontos(mesa,funcao, texto) {
    vsIntegralAMI.play();
    pontuacaoAMI++;
    texto.setText("Pontos: " + pontuacaoAMI);
    funcao.destroy();
    funcoesAMI.splice(funcoesAMI.indexOf(funcao),1);
}
function repeteJogo() {
    gameAMI.state.restart();
    jaJogouAMI = 0;
    a = 0;
    mesasAMI = [];
    funcoesAMI = [];
}
function vaiParaOBar(sprite, pointer, valor) {
    jaJogouAMI = 0;
    a = 0;
    mesasAMI = [];
    funcoesAMI = [];

    if(typeof hideGame === 'undefined'){
        console.warn("Ir para bar");
    }
    else{
        let cadeira = "AMI";
        if(valor === 0){
            cadeira = "";
        }
        hideGame(cadeira, "Queijo", valor, -25);
    }

}