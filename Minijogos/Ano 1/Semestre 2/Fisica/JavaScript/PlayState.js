"use strict";

let PlayState = {
    preload: function () {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVeritcally = true;
        this.graphicTextures = {};
        let reactor_circle = new Phaser.Circle(0, 0, game.rnd.realInRange(50, 75));
        this.graphicTextures.reactor = this.createTextureReactor(reactor_circle, 3, 0xff0000, 1, 0x00ff00);


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

        game.stage.backgroundColor = "#0072bc";

        this.score = 0;
        this.numeroParticulas = 20;
        this.messageText = game.add.text(game.world.centerX, 2*7/8*game.world.centerY, "", {font:"24px Arial", fill:"faedb1"});
        this.messageText.anchor.setTo(0.5);
        this.messageText.alpha = 0;


        this.reactor = this.placeReactor();
        game.world.add(this.reactor);
        game.physics.arcade.enable(this.reactor);
        this.reactor.body.setCircle(this.reactor.width/2);
        this.reactor.body.immovable = true;


        this.particulas = game.add.group();
        this.particulas.name = "Particulas";
        game.physics.arcade.enable(this.particulas);

        let particulas = this.placeParticulas(this.numeroParticulas, [this.reactor, this.particulas]);
        for(let part of particulas){
            this.particulas.add(part);
            // part.body.velocity = new Phaser.Point(50*Math.random(), 50*Math.random());
            part.body.collideWorldBounds = true;
            part.body.bounce = new Phaser.Point(1,1);
        }

        this.imanes = game.add.group();
        this.particulas.name = "Imanes";
        game.physics.arcade.enable(this.imanes);

        this.tempIman = undefined;
        this.limiteIman = 5;
        this.limiteResets = 2;

        game.input.onDown.add(this.createIman, this);
        game.input.onUp.add(this.placeIman, this);
        let spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceBar.onUp.add( function () {
            if(this.limiteResets > 0){
                game.add.tween(this.imanes).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                game.time.events.add(Phaser.Timer.SECOND * 0.6,  function () {
                    this.imanes.removeAll(true);
                    this.imanes.alpha = 1;
                }, this);
                this.limiteResets--;
            }
        }, this);

        this.timer = game.time.create(false);
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

        game.physics.arcade.collide(this.particulas, this.particulas);
        game.physics.arcade.collide(this.particulas, this.imanes);
        game.physics.arcade.overlap(this.reactor, this.particulas, this.increaseScore, null, this);

        if( game.input.activePointer.isDown && this.tempIman !== undefined ){
            this.tempIman.x = game.input.activePointer.worldX;
            this.tempIman.y = game.input.activePointer.worldY;
        }


    },
    render: function () {
        let minutos = Math.trunc(this.timer.duration/(60*1000));
        let segundos = (this.timer.duration/1000%60).toFixed(0);
        let texto = game.debug.text("Pontos " + this.score  , 25, 25, "#ffffff", "20px Arial");
        let texto2 = game.debug.text("Tempo Restante: " + minutos +"m"+segundos+"s" , 25, 50, "#ffffff", "20px Arial");
        let texto3 = game.debug.text("Resets Restantes: " + this.limiteResets, 25, 75, "#ffffff", "20px Arial");
        this.particulas.forEach(function (member) {
            game.debug.body(member, "rgba(0,0,0,0.4)");
        });
        this.imanes.forEach(function (member) {
            game.debug.body(member, "rgba(0,0,0,0.4)");
        });
        // game.debug.bodyInfo(this.reactor, 40, 40);
    },
    createTextureReactor: function (circle, lineWidth = 1, lineColor = 0x000000, lineAlpha = 1, fillColor = 0xffffff, fillAlpha = 1, textureResolution = 1, textureScaling = 0, texturePadding = 1) {
        let graphics = new Phaser.Graphics(game);

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
        let graphics = new Phaser.Graphics(game);

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
        let graphics = new Phaser.Graphics(game);

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

        let worldWidth = game.world.width;
        let worldHeight = game.world.height;
        let worldX = game.world.x;
        let worldY = game.world.y;

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
            sprite = new Phaser.Sprite(game, game.world.randomX, game.world.randomY, this.graphicTextures.reactor);
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
                sprite = new Phaser.Sprite(game, game.world.randomX, game.world.randomY, this.graphicTextures.particulas[Math.floor(Math.random() * this.graphicTextures.particulas.length)]);
                game.physics.arcade.enable(sprite);
                sprite.body.setCircle(sprite.width/2);

                dirty = dirty || this.checkOffWorld(sprite);
                dirty = dirty || game.physics.arcade.overlap(sprite, obstacles);
                dirty = dirty || game.physics.arcade.overlap(sprite, sprites);

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

        let sprite = new Phaser.Sprite(game, pointer.worldX, pointer.worldY, textura);
        sprite.polo = polo;
        sprite.alpha = 0.75;
        sprite.anchor.setTo(0.5, 0.5);
        sprite.name = "TempIman";
        game.world.add(sprite);
        this.tempIman = sprite;
    },
    placeIman: function(pointer){
        let sprite = this.tempIman;
        let dirty = false;

        if (sprite == undefined){
            return;
        }
        this.tempIman = undefined;

        game.physics.arcade.enable(sprite);
        sprite.body.setCircle(sprite.width/2);

        dirty = dirty || this.checkOffWorld(sprite);
        dirty = dirty || game.physics.arcade.overlap(sprite, this.particulas);
        dirty = dirty || game.physics.arcade.overlap(sprite, this.reactor);
        dirty = dirty || game.physics.arcade.overlap(sprite, this.imanes);

        if(dirty){
            game.add.tween(sprite).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            game.world.bringToTop(this.messageText);
            this.messageText.setText("Não pode sobrepor os imanes a outras particulas!!!");
            game.add.tween(this.messageText).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true,0,0,true);
            game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                game.world.remove(sprite, true);
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

                game.add.tween(sacrificado).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                game.time.events.add(Phaser.Timer.SECOND * 1.1, function () {
                    this.imanes.remove(sacrificado, true);
                }, this);
            }

            game.world.remove(sprite);
            sprite.body.immovable = true;
            this.imanes.add(sprite);
            game.add.tween(sprite).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            sprite.iman = new Iman(sprite.x, sprite.y, sprite.width/2, sprite.polo);
        }




    },
    increaseScore: function(obj1, obj2){
        this.score++;
        this.particulas.remove(obj2);
        game.world.add(obj2);
        game.add.tween(obj2).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        game.time.events.add(Phaser.Timer.SECOND * 1, function () {
            game.world.remove(obj2, true);
        }, this);
    },
    defeat: function () {
        if(this.particulas.length === 0){
            game.victory = true;
        }
        else{
            game.victory = false;
        }
        game.state.start("EndState");
    }

};

