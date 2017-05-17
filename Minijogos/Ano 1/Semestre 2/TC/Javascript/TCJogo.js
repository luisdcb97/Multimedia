"use strict";

var game = new Phaser.Game(800,540,Phaser.AUTO, 'TC');

let i;
let x, y;
var timer, timerEvent;
var popupGanhou;
var japassou = 0;
var estrela1aux,estrela2aux,estrela3aux;
var fx,lz,musica;


var gameState = {
    preload: function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVeritcally = true;

        this.load.image('fundo', "../../../../../Principal/Recursos/arduinoFundo.jpg");
        this.load.image('cabo1', "../../../../../Principal/Recursos/caboArduinoAmarelo.png");
        this.load.image('cabo2', "../../../../../Principal/Recursos/caboArduinoAzul.png");
        this.load.image('cabo3', "../../../../../Principal/Recursos/caboArduinoVermelho.png");
        this.load.image('cabo4', "../../../../../Principal/Recursos/caboArduinoAmarelo90Graus.png");
        this.load.image('cabo5', "../../../../../Principal/Recursos/caboArduinoAzul90Graus.png");
        this.load.image('cabo6', "../../../../../Principal/Recursos/caboArduinoVermelho90Graus.png");
        this.load.image('inicial', "../../../../../Principal/Recursos/caboArduinoInicial.png");
        this.load.image('final', "../../../../../Principal/Recursos/caboArduinoFinal.png");
        this.load.image('ledApagado', "../../../../../Principal/Recursos/ledArduino.png");
        this.load.image('ledLigado', "../../../../../Principal/Recursos/ledArduinoLigado.png");
        this.load.image('popupGanhou',"../../../../../Principal/Recursos/popupVitoriaJogoTC.png");
        this.load.image('popupPerdeu',"../../../../../Principal/Recursos/popupDerrota.png");
        this.load.image('estrela',"../../../../../Principal/Recursos/estrelaPontuacao.png");
        this.load.image('moeda',"../../../../../Principal/Recursos/moeda.png");
        this.load.image('botaoRepetir',"../../../../../Principal/Recursos/botaoREPETIR.png");
        this.load.image('botaoBAR',"../../../../../Principal/Recursos/botaoBAR.png");
        this.load.audio('somCabo', '../../../../../Principal/Recursos/cabosrodam.mp3');
        this.load.audio('somLuz', '../../../../../Principal/Recursos/luzacende.mp3');
        this.load.audio('musica', '../../../../../Principal/Recursos/musicaTC.mp3');
    },
    create: function () {
        timer = game.time.create();
        timerEvent = timer.add(Phaser.Timer.MINUTE * 2 + Phaser.Timer.SECOND*0, this.endTimerLoser, this);

        fx = this.add.audio('somCabo');
        lz = this.add.audio('somLuz');
        musica = this.add.audio('musica');
        musica.loop = true;
        musica.play();

        this.spriteCabos = [];
        this.cabos = [];
        this.background = this.add.sprite(0, 0, 'fundo');
        this.caboIni = this.add.sprite(100, 98, 'inicial');
        this.caboFin = this.add.sprite(100+9*54, 250, 'final');
        this.led = this.add.sprite(329+19,356,'ledApagado');
        for (let i = 0; i < 1; i++) {
            x = 154+i*54+27;
            y = 98+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 154+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 154+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 154+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 154+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 154+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 154+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 154+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
        }
        for (let i = 1; i < 2; i++) {
            x = 100+i*54+27;
            y = 152+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
        }
        for (let i = 1; i < 2; i++) {
            x = 100+i*54+27;
            y = 196+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
        }
        for (let i = 1; i < 2; i++) {
            x = 100+i*54+27;
            y = 250+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,2));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            x = 100+i*54+27;
            this.cabos.push(new Cabo(x,y,0,1));
            this.spriteCabos.push(this.add.sprite(x, y, 'cabo'+Math.floor(Math.random()*2+1)));
        }
        for(let i = 0; i< this.spriteCabos.length; i++){
            this.spriteCabos[i].anchor.setTo(0.5,0.5);
            this.spriteCabos[i].inputEnabled = true;
            this.spriteCabos[i].events.onInputDown.add(this.roda,this.spriteCabos[i]);
            this.spriteCabos[i].events.onInputDown.add(this.rodaCabo,this.cabos[i]);

        }

        this.estrela1 = this.add.sprite(660,16,'estrela');
        this.estrela2 = this.add.sprite(700,16,'estrela');
        this.estrela3 = this.add.sprite(740,16,'estrela');

        timer.start();

        timer.add(Phaser.Timer.SECOND * 15, this.perdeEstrela3, this);
        timer.add(Phaser.Timer.SECOND * 25, this.perdeEstrela2, this);




    },
    rodaCabo: function () {
        fx.play();
        this.alteraRotacao(this.entrada,this.saida);
    },
    roda: function () {
        this.angle += 90;
    },
    update: function(){
        //       2
        //    0     1
        //       3


        if(japassou == 0 && this.cabos[0].entrada == 3 && this.cabos[4].entrada == 1 && this.cabos[5].entrada == 3 &&
            (this.cabos[8].entrada == 2 || this.cabos[8].entrada == 3) && (this.cabos[16].entrada == 2 || this.cabos[16].entrada == 3) &&
            this.cabos[24].entrada == 2 && (this.cabos[25].entrada == 0 || this.cabos[25].entrada == 1) && this.cabos[26].entrada == 0 &&
            this.cabos[18].entrada == 3 && this.cabos[17].entrada == 2 && this.cabos[9].entrada == 1 && (this.cabos[10].entrada == 0 || this.cabos[10].entrada == 1) &&
            this.cabos[11].entrada == 3 && (this.cabos[19].entrada == 2 || this.cabos[19].entrada == 3) && this.cabos[27].entrada == 2
            && this.cabos[28].entrada == 0 && (this.cabos[20].entrada == 2 || this.cabos[20].entrada == 3) && (this.cabos[12].entrada == 2 || this.cabos[12].entrada == 3)
            && this.cabos[13].entrada == 2 && this.cabos[14].entrada == 3 && (this.cabos[22].entrada == 2 || this.cabos[22].entrada == 3) && this.cabos[30].entrada ==2
            && (this.cabos[31].entrada == 0 || this.cabos[31].entrada == 1)){
            //this.led = this.remove.sprite(329+19,356,'ledApagado');
            musica.pause();
            musica.currentTime = 0;
            this.led = this.add.sprite(329+19,356,'ledLigado');
            lz.play();
            this.endTimerApenas();
            timerEvent = timer.add(Phaser.Timer.SECOND*1, this.jogadorGanha, this);

            timer.start();
            japassou = 1;
        }

    },
    render: function () {
        if(timer.running){
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms)/1000)),2,14,"#EF180D");
        }
        else{
            //METER POPUP
            game.debug.text("Tempo terminado!",2,14,"#EF180D");
        }
    },
    endTimerLoser: function () {
        this.jogadorPerde();
        timer.stop();
    },
    endTimerApenas: function () {
        timer.stop();
    },
    perdeEstrela3: function() {
        this.estrela3.destroy();
    },
    perdeEstrela2: function() {
        this.estrela2.destroy();
    },
    formatTime: function (s) {
        let minutos = "0" + Math.floor(s/60);
        let segundos = "0" + (s-minutos*60);
        return minutos.substr(-2)+":"+segundos.substr(-2);
    },
    jogadorGanha: function () {
        let popupG = this.add.sprite(100, 90, 'popupGanhou');
        popupG.alpha = 0;
        let valor = 0;
        game.add.tween(popupG).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

        if (this.estrela1.exists == true){
            valor = 2;
            estrela1aux = this.add.sprite(345,170,'estrela');
            estrela1aux.alpha = 0;
            game.add.tween(estrela1aux).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        }
        if (this.estrela2.exists == true){
            valor = 3;
            estrela2aux = this.add.sprite(385,170,'estrela');
            estrela2aux.alpha = 0;
            game.add.tween(estrela2aux).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        }
        if (this.estrela3.exists == true){
            valor = 4;
            estrela3aux = this.add.sprite(425,170,'estrela');
            estrela3aux.alpha = 0;
            game.add.tween(estrela3aux).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        }
        let vicText = game.add.text(490,166, '+'+valor, {font: "40px Kristen ITC", fill: "#fbb117"});
        let popupMoeda = this.add.sprite(530,178,'moeda');
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
        this.botaoRepetir.events.onInputDown.add(repeteJogo);
        this.botaoBAR.events.onInputDown.add(vaiParaOBar);
    },
    jogadorPerde: function () {
        let popupD = this.add.sprite(100, 90, 'popupPerdeu');
        popupD.alpha = 0;
        game.add.tween(popupD).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
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
        this.botaoRepetir.events.onInputDown.add(repeteJogo);
        this.botaoBAR.events.onInputDown.add(vaiParaOBar);
    }
};

function repeteJogo() {
    japassou = 0;
    game.state.restart();
}
function vaiParaOBar(dinheiro) {
    let obj = {
        dinheiro: dinheiro,
        baguete: "Atum",
        energia: 30,
        cadeira: "TC"

    };

    window.parent.postMessage(obj, "*");
}




game.state.add("MainGame", gameState);
game.state.start("MainGame");


