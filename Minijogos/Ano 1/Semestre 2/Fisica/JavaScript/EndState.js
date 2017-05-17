"use strict";

let EndState = {
    preload: function () {

        if(typeof resourcePrefix === 'undefined'){
            this.resourcePrefix = "../../../../../Principal/";
        }
        else{
            this.resourcePrefix = resourcePrefix;
        }

        this.load.image('popupGanhou',this.resourcePrefix + "Recursos/popupVitoriaJogoFisica.png");
        this.load.image('popupPerdeu',this.resourcePrefix + "Recursos/popupDerrota.png");
        this.load.image('moeda',this.resourcePrefix + "Recursos/moeda.png");
        this.load.image('botaoRepetir',this.resourcePrefix + "Recursos/botaoREPETIR.png");
        this.load.image('botaoBAR',this.resourcePrefix + "Recursos/botaoBAR.png");
        this.load.audio('vitoria',this.resourcePrefix + "Recursos/vitoriaAMI.mp3");

    },
    create: function () {
        this.vit = this.add.audio('vitoria');
        if(gameFisica.victory){
            this.jogadorGanha();
        }
        else{
            this.jogadorPerde();
        }
    },
    update: function () {

    },
    jogadorGanha: function () {
        this.vit.play();

        let popupG = this.add.sprite(100, 90, 'popupGanhou');
        popupG.alpha = 0;
        let valor = 0;
        gameFisica.add.tween(popupG).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

        if (gameFisica.score>12){
            let vicText = gameFisica.add.text(215,166, 'Pontos: '+gameFisica.score+',     +'+5, {font: "40px Kristen ITC", fill: "#fbb117"});
        }
        else if(gameFisica.score>9){
            let vicText = gameFisica.add.text(215,166, 'Pontos: '+gameFisica.score+',     +'+4, {font: "40px Kristen ITC", fill: "#fbb117"});
        }
        else{
            let vicText = gameFisica.add.text(215,166, 'Pontos: '+gameFisica.score+',     +'+3, {font: "40px Kristen ITC", fill: "#fbb117"});
        }

        let popupMoeda = this.add.sprite(530,178,'moeda');
        popupMoeda.alpha = 0;
        gameFisica.add.tween(popupMoeda).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

        this.botaoRepetir = this.add.sprite(265,315,'botaoRepetir');
        this.botaoRepetir.alpha = 0;
        gameFisica.add.tween(this.botaoRepetir).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        this.botaoBAR = this.add.sprite(430,315,'botaoBAR');
        this.botaoBAR.alpha = 0;
        gameFisica.add.tween(this.botaoBAR).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
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
        this.botaoRepetir.events.onInputDown.add(this.repeteJogoFisica);
        this.botaoBAR.events.onInputDown.add(this.vaiParaOBar);
    },
    jogadorPerde: function () {
        let popupD = this.add.sprite(100, 90, 'popupPerdeu');
        popupD.alpha = 0;
        gameFisica.add.tween(popupD).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        this.botaoRepetir = this.add.sprite(265,315,'botaoRepetir');
        this.botaoRepetir.alpha = 0;
        gameFisica.add.tween(this.botaoRepetir).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
        this.botaoBAR = this.add.sprite(430,315,'botaoBAR');
        this.botaoBAR.alpha = 0;
        gameFisica.add.tween(this.botaoBAR).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);
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
        this.botaoRepetir.events.onInputDown.add(this.repeteJogoFisica);
        this.botaoBAR.events.onInputDown.add(this.vaiParaOBar);
    },
    repeteJogoFisica: function () {
        gameFisica.state.start("PlayState");
    },
    vaiParaOBar: function () {
        if(typeof hideGame === 'undefined'){
            console.warn("Ir para bar");
        }
        else{
            hideGame();
        }
    }
};
