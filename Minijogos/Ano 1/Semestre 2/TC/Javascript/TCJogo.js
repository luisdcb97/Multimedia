"use strict";



let i;
let x, y;

var gameState = {
    preload: function () {
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

    },
    create: function () {
        this.spriteCabos = [];
        this.cabos = [];
        this.background = this.add.sprite(0, 0, 'fundo');
        this.caboIni = this.add.sprite(100, 98, 'inicial');
        this.caboFin = this.add.sprite(100+9*54, 250, 'final');
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
        for (let i = 1; i < 9; i++) {
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
        this.led = this.add.sprite(329+19,356,'ledApagado');
        //if pressed
        for(let i = 0; i< this.spriteCabos.length; i++){
            this.spriteCabos[i].anchor.setTo(0.5,0.5);
            this.spriteCabos[i].inputEnabled = true;
            this.spriteCabos[i].events.onInputDown.add(this.roda,this.spriteCabos[i]);
            this.spriteCabos[i].events.onInputDown.add(this.rodaCabo,this.cabos[i]);

        }


    },
    rodaCabo: function () {
        this.alteraRotacao(this.entrada,this.saida);
    },
    roda: function () {
        this.angle += 90;
    },
    update: function(){
        //       2
        //    0     1
        //       3
        if(this.cabos[0].entrada == 3 && this.cabos[4].entrada == 1 && this.cabos[5].entrada == 3 &&
            (this.cabos[8].entrada == 2 || this.cabos[8].entrada == 3) && (this.cabos[16].entrada == 2 || this.cabos[16].entrada == 3) &&
            this.cabos[24].entrada == 2 && (this.cabos[25].entrada == 0 || this.cabos[25].entrada == 1) && this.cabos[26].entrada == 0 &&
            this.cabos[18].entrada == 3 && this.cabos[17].entrada == 2 && this.cabos[9].entrada == 1 && (this.cabos[10].entrada == 0 || this.cabos[10].entrada == 1) &&
            this.cabos[11].entrada == 3 && (this.cabos[19].entrada == 2 || this.cabos[19].entrada == 3) && this.cabos[27].entrada == 2
            && this.cabos[28].entrada == 0 && (this.cabos[20].entrada == 2 || this.cabos[20].entrada == 3) && (this.cabos[12].entrada == 2 || this.cabos[12].entrada == 3)
            && this.cabos[13].entrada == 2 && this.cabos[14].entrada == 3 && (this.cabos[22].entrada == 2 || this.cabos[22].entrada == 3) && this.cabos[30].entrada ==2
            && (this.cabos[31].entrada == 0 || this.cabos[31].entrada == 1)){
            //this.led = this.remove.sprite(329+19,356,'ledApagado');

            this.led = this.add.sprite(329+19,356,'ledLigado');
        }
        else this.led = this.add.sprite(329+19,356,'ledApagado');
    }
};

var game = new Phaser.Game(800,540,Phaser.AUTO, 'TC');

game.state.add("MainGame", gameState);
game.state.start("MainGame");


