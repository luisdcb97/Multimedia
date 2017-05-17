"use strict";

let EndState = {
    preload: function () {
        this.load.image('popupGanhou',"../../../../../Principal/Recursos/popupVitoriaJogoFisica.png");
        this.load.image('popupPerdeu',"../../../../../Principal/Recursos/popupDerrota.png");
        this.load.image('moeda',"../../../../../Principal/Recursos/moeda.png");
        this.load.image('botaoRepetir',"../../../../../Principal/Recursos/botaoREPETIR.png");
        this.load.image('botaoBAR',"../../../../../Principal/Recursos/botaoBAR.png");
        this.load.audio('vitoria','../../../../../Principal/Recursos/vitoriaAMI.mp3')

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
        this.botaoRepetir.events.onInputDown.add(repeteJogo);
        this.botaoBAR.events.onInputDown.add(vaiParaOBar);
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
        this.botaoRepetir.events.onInputDown.add(repeteJogo);
        this.botaoBAR.events.onInputDown.add(vaiParaOBar);
    },
};

function repeteJogo() {
    gameFisica.state.start("PlayState");
}
function vaiParaOBar(dinheiro) {
    let obj = {
        dinheiro: dinheiro,
        baguete: "Atum",
        energia: 30,
        cadeira: "TC"

    };

    let jan = window.open("about:blank");
    jan.postMessage(obj,"*");
}