"use strict";

let PlayState = {
    preload: function () {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVeritcally = true;
        this.graphicTextures = {};
        let reactor_circle = new Phaser.Circle(0, 0, gameFisica.rnd.realInRange(50, 75));
        this.graphicTextures.reactor = this.createTextureReactor(reactor_circle, 3, 0xff0000, 1, 0x00ff00);

        if(typeof resourcePrefix === 'undefined'){
            this.resourcePrefix = "../../../../../Principal/";
        }
        else{
            this.resourcePrefix = resourcePrefix;
        }


        gameFisica.load.audio('Positivo',this.resourcePrefix + "Recursos/imanmais.mp3");
        gameFisica.load.audio('MusicaFisica',this.resourcePrefix + "Recursos/musicadefisica.mp3");
        gameFisica.load.audio('Negativo',this.resourcePrefix + "Recursos/imanmenos.mp3");
        gameFisica.load.audio('Reator',this.resourcePrefix + "Recursos/somdoreator.mp3");

        this.graphicTextures.particulas = [];
        for (let i=0; i<10; i++){
            let particula = new Particula(5, 5, 15);
            let texturaParticula = this.createTextureParticula(particula);
            this.graphicTextures.particulas.push(texturaParticula);
        }

        let iman_pos = new Iman(5, 5, 15, 5);
        let iman_neg = new Iman(5, 5, 15, -5);


        this.graphicTextures.imanPositivo = this.createTextureIman(iman_pos);
        this.graphicTextures.imanNegativo = this.createTextureIman(iman_neg);
    },
    create: function () {

        gameFisica.stage.backgroundColor = "#0072bc";

        gameFisica.score = 0;
        this.numeroParticulas = 20;
        this.messageText = gameFisica.add.text(gameFisica.world.centerX, 2*7/8*gameFisica.world.centerY, "", {font:"24px Arial", fill:"faedb1"});
        this.messageText.anchor.setTo(0.5);
        this.messageText.alpha = 0;

        this.mais = this.add.audio('Positivo');
        this.menos  = this.add.audio('Negativo');
        this.reator  = this.add.audio('Reator');
        this.musicaFisica = this.add.audio('MusicaFisica');
        this.musicaFisica.loop = true;
        this.musicaFisica.play();

        this.reactor = this.placeReactor();
        gameFisica.world.add(this.reactor);
        gameFisica.physics.arcade.enable(this.reactor);
        this.reactor.body.setCircle(this.reactor.width/2);
        this.reactor.body.immovable = true;


        this.particulas = gameFisica.add.group();
        this.particulas.name = "Particulas";
        gameFisica.physics.arcade.enable(this.particulas);

        let particulas = this.placeParticulas(this.numeroParticulas, [this.reactor, this.particulas]);
        for(let part of particulas){
            this.particulas.add(part);
            // part.body.velocity = new Phaser.Point(50*Math.random(), 50*Math.random());
            part.body.collideWorldBounds = true;
            part.body.bounce = new Phaser.Point(1,1);
        }

        this.imanes = gameFisica.add.group();
        this.particulas.name = "Imanes";
        gameFisica.physics.arcade.enable(this.imanes);

        this.tempIman = undefined;
        this.limiteIman = 5;
        this.limiteResets = 2;

        gameFisica.input.onDown.add(this.createIman, this);
        gameFisica.input.onUp.add(this.placeIman, this);
        let spaceBar = gameFisica.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceBar.onUp.add( function () {
            if(this.limiteResets > 0){
                gameFisica.add.tween(this.imanes).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                gameFisica.time.events.add(Phaser.Timer.SECOND * 0.6,  function () {
                    this.imanes.removeAll(true);
                    this.imanes.alpha = 1;
                }, this);
                this.limiteResets--;
            }
        }, this);

        this.timer = gameFisica.time.create(false);
        this.timer.add(Phaser.Timer.MINUTE * 2, this.defeat, this);
        this.timer.start();
    },
    update: function () {
        this.particulas.forEach(function (memberPart) {
            memberPart.body.acceleration.setTo(0);

            this.imanes.forEach(function (memberIman) {
                let forceObj = memberIman.iman.aplicaForca(memberPart.x, memberPart.y);
                memberPart.body.acceleration.x += forceObj.fX;
                memberPart.body.acceleration.y += forceObj.fY;

            }, this);
        }, this);

        gameFisica.physics.arcade.collide(this.particulas, this.particulas);
        gameFisica.physics.arcade.collide(this.particulas, this.imanes);
        gameFisica.physics.arcade.overlap(this.reactor, this.particulas, this.increaseScore, null, this);

        if( gameFisica.input.activePointer.isDown && this.tempIman !== undefined ){
            this.tempIman.x = gameFisica.input.activePointer.worldX;
            this.tempIman.y = gameFisica.input.activePointer.worldY;
        }


    },
    render: function () {
        let minutos = Math.trunc(this.timer.duration/(60*1000));
        let segundos = (this.timer.duration/1000%60).toFixed(0);
        let texto = gameFisica.debug.text("Pontos: " + gameFisica.score  , 25, 25, "#ffffff", "20px Arial");
        let texto2 = gameFisica.debug.text("Tempo Restante: " + minutos +"m"+segundos+"s" , 25, 50, "#ffffff", "20px Arial");
        let texto3 = gameFisica.debug.text("Resets Restantes: " + this.limiteResets, 25, 75, "#ffffff", "20px Arial");
        // this.particulas.forEach(function (member) {
        //     gameFisica.debug.body(member, "rgba(0,0,0,0.4)");
        // });
        // this.imanes.forEach(function (member) {
        //     gameFisica.debug.body(member, "rgba(0,0,0,0.4)");
        // });
        // gameFisica.debug.bodyInfo(this.reactor, 40, 40);
    },
    createTextureReactor: function (circle, lineWidth = 1, lineColor = 0x000000, lineAlpha = 1, fillColor = 0xffffff, fillAlpha = 1, textureResolution = 1, textureScaling = 0, texturePadding = 1) {
        let graphics = new Phaser.Graphics(gameFisica);

        graphics.lineStyle(lineWidth, lineColor, lineAlpha);
        graphics.beginFill(fillColor, fillAlpha);
        graphics.drawCircle(
            circle.radius + circle.lineWidth,
            circle.radius + circle.lineWidth,
            circle.diameter,
        );

        let texture = graphics.generateTexture(textureResolution, textureScaling, texturePadding);
        graphics.destroy();
        return texture;

    },

    createTextureParticula: function (particula, pieces=3, textureResolution = 1, textureScaling = 0, texturePadding = 1) {
        let graphics = new Phaser.Graphics(gameFisica);

        graphics.lineStyle(2, particula.strokeColor, 1);

        graphics.drawCircle(particula.x, particula.y, 2 * particula.raio);

        let ang = Math.PI / pieces;
        for(let i = 0; i < pieces; i++){
            graphics.beginFill(particula.fillColor, 1);
            graphics.moveTo(particula.x, particula.y);
            graphics.lineTo(particula.x + particula.raio * Math.cos(2 * i * ang ), particula.y + particula.raio * Math.sin( 2 * i * ang));
            graphics.arc(particula.x, particula.y, particula.raio, 2 * i * ang, ( 2 * i + 1 ) * ang);
            graphics.lineTo(particula.x ,particula.y );
        }

        let texture = graphics.generateTexture(textureResolution, textureScaling, texturePadding);
        graphics.destroy();
        return texture;
    },
    createTextureIman: function (iman, textureResolution = 1, textureScaling = 0, texturePadding = 1) {
        let graphics = new Phaser.Graphics(gameFisica);

        graphics.lineStyle(2, iman.strokeColor, 1);
        graphics.beginFill(iman.fillColor, 1);
        graphics.drawCircle(iman.x, iman.y, 2 * iman.raio);
        graphics.endFill();
        graphics.moveTo(iman.x - iman.raio / 2, iman.y);
        graphics.lineTo(iman.x + iman.raio / 2, iman.y);
        if(iman.polo < 0){
            graphics.moveTo(iman.y, iman.x - iman.raio / 2);
            graphics.lineTo(iman.y, iman.x + iman.raio / 2);
        }

        let texture = graphics.generateTexture(textureResolution, textureScaling, texturePadding);
        graphics.destroy();
        return texture;
    },
    checkOffWorld: function (sprite) {
        let spriteX = sprite.x;
        let spriteY = sprite.y;
        let spriteHeight = sprite.height;
        let spriteWidth = sprite.width;

        let worldWidth = gameFisica.world.width;
        let worldHeight = gameFisica.world.height;
        let worldX = gameFisica.world.x;
        let worldY = gameFisica.world.y;

        if(spriteX < worldX || spriteY < worldY ||
            spriteX > worldX + worldWidth || spriteY > worldY + worldHeight ||
            spriteX - spriteWidth < worldX || spriteY - spriteHeight < worldY ||
            spriteX + spriteWidth > worldX + worldWidth || spriteY + spriteHeight > worldY + worldHeight)
        {
            return true;
        }

        return false;
    },
    placeReactor: function () {
        let sprite;
        do{
            sprite = new Phaser.Sprite(gameFisica, gameFisica.world.randomX, gameFisica.world.randomY, this.graphicTextures.reactor);
        }while(this.checkOffWorld(sprite));
        return sprite;
    },
    placeParticulas: function (amount, obstacles) {
        let sprite;
        let dirty;
        let sprites = [];
        for (let i=0; i< amount;i++) {
            do {
                dirty = false;
                sprite = new Phaser.Sprite(gameFisica, gameFisica.world.randomX, gameFisica.world.randomY, this.graphicTextures.particulas[Math.floor(Math.random() * this.graphicTextures.particulas.length)]);
                gameFisica.physics.arcade.enable(sprite);
                sprite.body.setCircle(sprite.width/2);

                dirty = dirty || this.checkOffWorld(sprite);
                dirty = dirty || gameFisica.physics.arcade.overlap(sprite, obstacles);
                dirty = dirty || gameFisica.physics.arcade.overlap(sprite, sprites);

            } while (dirty);
            sprites.push(sprite);
        }

        return sprites;
    },
    createIman: function (pointer) {
        let polo;
        let textura;
        if (pointer.leftButton.isDown){
            polo = 200;
            textura = this.graphicTextures.imanPositivo;
        }
        else {
            polo = -200;
            textura = this.graphicTextures.imanNegativo;
        }

        let sprite = new Phaser.Sprite(gameFisica, pointer.worldX, pointer.worldY, textura);
        sprite.polo = polo;
        sprite.alpha = 0.75;
        sprite.anchor.setTo(0.5, 0.5);
        sprite.name = "TempIman";
        gameFisica.world.add(sprite);
        this.tempIman = sprite;
    },
    placeIman: function(pointer){
        let sprite = this.tempIman;
        let dirty = false;

        if (sprite == undefined){
            return;
        }
        this.tempIman = undefined;

        gameFisica.physics.arcade.enable(sprite);
        sprite.body.setCircle(sprite.width/2);

        dirty = dirty || this.checkOffWorld(sprite);
        dirty = dirty || gameFisica.physics.arcade.overlap(sprite, this.particulas);
        dirty = dirty || gameFisica.physics.arcade.overlap(sprite, this.reactor);
        dirty = dirty || gameFisica.physics.arcade.overlap(sprite, this.imanes);

        if(dirty){
            gameFisica.add.tween(sprite).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            gameFisica.world.bringToTop(this.messageText);
            this.messageText.setText("Não pode sobrepor os imanes a outras particulas!!!");
            gameFisica.add.tween(this.messageText).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true,0,0,true);
            gameFisica.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                gameFisica.world.remove(sprite, true);
            }, this);
        }
        else{
            let numImanes = 0;
            for (let i =0; i< this.imanes.length; i++ ){
                if(Math.sign(sprite.polo) === Math.sign(this.imanes.getChildAt(i).polo)){
                    numImanes++;
                }
            }

            if (numImanes >= this.limiteIman){
                let sacrificado;
                for (let i =0; i< this.imanes.length; i++ ){
                    if(Math.sign(sprite.polo) === Math.sign(this.imanes.getChildAt(i).polo)){
                        sacrificado = this.imanes.getChildAt(i);
                        break;
                    }
                }

                gameFisica.add.tween(sacrificado).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                gameFisica.time.events.add(Phaser.Timer.SECOND * 1.1, function () {
                    this.imanes.remove(sacrificado, true);
                }, this);
            }


            gameFisica.world.remove(sprite);
            sprite.body.immovable = true;
            this.imanes.add(sprite);
            gameFisica.add.tween(sprite).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            sprite.iman = new Iman(sprite.x, sprite.y, sprite.width/2, sprite.polo);
            if (sprite.polo>0){
                this.mais.play();
            }
            else{
                this.menos.play();
            }
        }




    },
    increaseScore: function(obj1, obj2){
        this.reator.play();
        gameFisica.score++;
        this.particulas.remove(obj2);
        gameFisica.world.add(obj2);
        gameFisica.add.tween(obj2).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        gameFisica.time.events.add(Phaser.Timer.SECOND * 1, function () {
            gameFisica.world.remove(obj2, true);
        }, this);
    },
    defeat: function () {
        this.musicaFisica.pause();
        this.musicaFisica.currentTime = 0;
        if(this.particulas.length < 14){
            gameFisica.victory = true;
        }
        else{
            gameFisica.victory = false;
        }
        gameFisica.state.clearCurrentState();
        gameFisica.state.start("EndState");
    }

};

