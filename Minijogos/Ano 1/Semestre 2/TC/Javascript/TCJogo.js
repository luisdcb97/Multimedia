"use strict";

var gameTC = new Phaser.Game(800,540,Phaser.AUTO, 'Jogo');

let i;
let xTC, yTC;
var timerTC, timerEventTC;
var popupGanhouTC;
var japassouTC = 0;
var estrela1auxTC,estrela2auxTC,estrela3auxTC;
var fxTC,lzTC,musicaTC;


var gameStateTC = {
    preload: function () {
        gameTC.scale.pageAlignHorizontally = true;
        gameTC.scale.pageAlignVeritcally = true;

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
        this.load.image('popupGanhouTC',"../../../../../Principal/Recursos/popupVitoriaJogoTC.png");
        this.load.image('popupPerdeu',"../../../../../Principal/Recursos/popupDerrota.png");
        this.load.image('estrela',"../../../../../Principal/Recursos/estrelaPontuacao.png");
        this.load.image('moeda',"../../../../../Principal/Recursos/moeda.png");
        this.load.image('botaoRepetir',"../../../../../Principal/Recursos/botaoREPETIR.png");
        this.load.image('botaoBAR',"../../../../../Principal/Recursos/botaoBAR.png");
        this.load.audio('somCabo', '../../../../../Principal/Recursos/cabosrodam.mp3');
        this.load.audio('somLuz', '../../../../../Principal/Recursos/luzacende.mp3');
        this.load.audio('musicaTC', '../../../../../Principal/Recursos/musicaTC.mp3');
    },
    create: function () {
        timerTC = gameTC.time.create();
        timerEventTC = timerTC.add(Phaser.Timer.MINUTE * 2 + Phaser.Timer.SECOND*0, this.endTimerLoser, this);

        fxTC = this.add.audio('somCabo');
        lzTC = this.add.audio('somLuz');
        musicaTC = this.add.audio('musicaTC');
        musicaTC.loop = true;
        musicaTC.play();

        this.spriteCabos = [];
        this.cabos = [];
        this.background = this.add.sprite(0, 0, 'fundo');
        this.caboIni = this.add.sprite(100, 98, 'inicial');
        this.caboFin = this.add.sprite(100+9*54, 250, 'final');
        this.led = this.add.sprite(329+19,356,'ledApagado');
        for (let i = 0; i < 1; i++) {
            xTC = 154+i*54+27;
            yTC = 98+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 154+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 154+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 154+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 154+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 154+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 154+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 154+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
        }
        for (let i = 1; i < 2; i++) {
            xTC = 100+i*54+27;
            yTC = 152+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
        }
        for (let i = 1; i < 2; i++) {
            xTC = 100+i*54+27;
            yTC = 196+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
        }
        for (let i = 1; i < 2; i++) {
            xTC = 100+i*54+27;
            yTC = 250+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,2));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*3+4)));
            i++;
            xTC = 100+i*54+27;
            this.cabos.push(new Cabo(xTC,yTC,0,1));
            this.spriteCabos.push(this.add.sprite(xTC, yTC, 'cabo'+Math.floor(Math.random()*2+1)));
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

        timerTC.start();

        timerTC.add(Phaser.Timer.SECOND * 15, this.perdeEstrela3, this);
        timerTC.add(Phaser.Timer.SECOND * 25, this.perdeEstrela2, this);




    },
    rodaCabo: function () {
        fxTC.play();
        this.alteraRotacao(this.entrada,this.saida);
    },
    roda: function () {
        this.angle += 90;
    },
    update: function(){
        //       2
        //    0     1
        //       3


        if(japassouTC == 0 && this.cabos[0].entrada == 3 && this.cabos[4].entrada == 1 && this.cabos[5].entrada == 3 &&
            (this.cabos[8].entrada == 2 || this.cabos[8].entrada == 3) && (this.cabos[16].entrada == 2 || this.cabos[16].entrada == 3) &&
            this.cabos[24].entrada == 2 && (this.cabos[25].entrada == 0 || this.cabos[25].entrada == 1) && this.cabos[26].entrada == 0 &&
            this.cabos[18].entrada == 3 && this.cabos[17].entrada == 2 && this.cabos[9].entrada == 1 && (this.cabos[10].entrada == 0 || this.cabos[10].entrada == 1) &&
            this.cabos[11].entrada == 3 && (this.cabos[19].entrada == 2 || this.cabos[19].entrada == 3) && this.cabos[27].entrada == 2
            && this.cabos[28].entrada == 0 && (this.cabos[20].entrada == 2 || this.cabos[20].entrada == 3) && (this.cabos[12].entrada == 2 || this.cabos[12].entrada == 3)
            && this.cabos[13].entrada == 2 && this.cabos[14].entrada == 3 && (this.cabos[22].entrada == 2 || this.cabos[22].entrada == 3) && this.cabos[30].entrada ==2
            && (this.cabos[31].entrada == 0 || this.cabos[31].entrada == 1)){
            //this.led = this.remove.sprite(329+19,356,'ledApagado');
            musicaTC.pause();
            musicaTC.currentTime = 0;
            this.led = this.add.sprite(329+19,356,'ledLigado');
            lzTC.play();
            this.endTimerApenas();
            timerEventTC = timerTC.add(Phaser.Timer.SECOND*1, this.jogadorGanha, this);
            timerTC.start();
            japassouTC = 1;
        }

    },
    render: function () {
        if(timerTC.running){
            gameTC.debug.text(this.formatTime(Math.round((timerEventTC.delay - timerTC.ms)/1000)),2,14,"#EF180D");
        }
        else{
            //METER POPUP
            gameTC.debug.text("Tempo terminado!",2,14,"#EF180D");
        }
    },
    endTimerLoser: function () {
        musicaTC.pause();
        musicaTC.currentTime = 0;
        this.jogadorPerde();
        timerTC.stop();
    },
    endTimerApenas: function () {
        timerTC.stop();
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
        this.cabos = [];
        for (let i = 0; i< this.cabos.length; i++){
            this.spriteCabos[i].destroy();
        }
        let popupG = this.add.sprite(100, 90, 'popupGanhouTC');
        popupG.alpha = 0;
        let valor = 0;
        gameTC.add.tween(popupG).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

        if (this.estrela1.exists == true){
            valor = 2;
            estrela1auxTC = this.add.sprite(345,170,'estrela');
            estrela1auxTC.alpha = 0;
            gameTC.add.tween(estrela1auxTC).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        }
        if (this.estrela2.exists == true){
            valor = 3;
            estrela2auxTC = this.add.sprite(385,170,'estrela');
            estrela2auxTC.alpha = 0;
            gameTC.add.tween(estrela2auxTC).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        }
        if (this.estrela3.exists == true){
            valor = 4;
            estrela3auxTC = this.add.sprite(425,170,'estrela');
            estrela3auxTC.alpha = 0;
            gameTC.add.tween(estrela3auxTC).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        }
        let vicText = gameTC.add.text(490,166, '+'+valor, {font: "40px Kristen ITC", fill: "#fbb117"});
        let popupMoeda = this.add.sprite(530,178,'moeda');
        popupMoeda.alpha = 0;
        gameTC.add.tween(popupMoeda).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

        this.botaoRepetir = this.add.sprite(265,315,'botaoRepetir');
        this.botaoRepetir.alpha = 0;
        gameTC.add.tween(this.botaoRepetir).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        this.botaoBAR = this.add.sprite(430,315,'botaoBAR');
        this.botaoBAR.alpha = 0;
        gameTC.add.tween(this.botaoBAR).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
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
        this.botaoRepetir.events.onInputDown.add(this.repeteJogoTC);
        this.botaoBAR.events.onInputDown.add(this.vaiParaOBar);
    },
    jogadorPerde: function () {
        let popupD = this.add.sprite(100, 90, 'popupPerdeu');
        popupD.alpha = 0;
        gameTC.add.tween(popupD).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        this.botaoRepetir = this.add.sprite(265,315,'botaoRepetir');
        this.botaoRepetir.alpha = 0;
        gameTC.add.tween(this.botaoRepetir).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        this.botaoBAR = this.add.sprite(430,315,'botaoBAR');
        this.botaoBAR.alpha = 0;
        gameTC.add.tween(this.botaoBAR).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
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
        this.botaoRepetir.events.onInputDown.add(this.repeteJogoTC);
        this.botaoBAR.events.onInputDown.add(this.vaiParaOBar);
    },
    repeteJogoTC: function () {
        japassouTC = 0;
        gameTC.state.restart();
    },
    vaiParaOBar: function () {
        console.log("bar");
    }


};

gameTC.state.add("MainGameTC", gameStateTC);


