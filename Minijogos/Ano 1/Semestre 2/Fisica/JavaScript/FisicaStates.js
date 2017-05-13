"use strict";

let BootState = {};

let MainState = {
    preload: function () {

    },
    create: function () {
        this.graphics = game.add.graphics(0, 0);
        this.circle = new Phaser.Circle(game.world.centerX, game.world.centerY * 1.3, 100);

        this.arrowLength = 10;
        this.arrowWidth = 10;
        this.angle = 50;

        this.graphics.lineStyle(2, 0xffd900, 1);

        this.graphics.arc(this.circle.x, this.circle.y, this.circle.radius, Phaser.Math.degToRad(this.angle - this.arrowLength), Phaser.Math.degToRad(this.angle - this.arrowLength - 180), true);

        this.graphics.lineStyle(2, 0x660000, 1);


        this.linha = new Phaser.Line(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y, this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.y);


        this.linhaNormal = new Phaser.Line(0, 0, 0, 0);
        this.linhaNormal.fromAngle(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y, this.linha.normalAngle, this.arrowWidth);

        this.linhaAntiNormal = new Phaser.Line(0, 0, 0, 0);
        this.linhaAntiNormal.fromAngle(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y, this.linha.normalAngle, -this.arrowWidth);

        this.graphics.moveTo(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.y);
        this.graphics.beginFill(0xcc0000, 1);
        this.graphics.lineTo(this.linhaNormal.end.x, this.linhaNormal.end.y);
        this.graphics.lineTo(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y);
        this.graphics.lineTo(this.linhaAntiNormal.end.x, this.linhaAntiNormal.end.y);
        this.graphics.lineTo(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.y);
        this.graphics.endFill();

    },
    update: function () {
        console.log(game.time.now);
        this.graphics.clear();

        this.angle += 5;

        this.graphics.lineStyle(2, 0xffd900, 1);

        this.graphics.arc(this.circle.x, this.circle.y, this.circle.radius, Phaser.Math.degToRad(this.angle - this.arrowLength), Phaser.Math.degToRad(this.angle - this.arrowLength - 180), true);

        this.graphics.lineStyle(2, 0x660000, 1);

        this.linha = new Phaser.Line(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y, this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.y);


        this.linhaNormal = new Phaser.Line(0, 0, 0, 0);
        this.linhaNormal.fromAngle(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y, this.linha.normalAngle, this.arrowWidth);

        this.linhaAntiNormal = new Phaser.Line(0, 0, 0, 0);
        this.linhaAntiNormal.fromAngle(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y, this.linha.normalAngle, -this.arrowWidth);

        this.graphics.moveTo(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.y);
        this.graphics.beginFill(0xcc0000, 1);
        this.graphics.lineTo(this.linhaNormal.end.x, this.linhaNormal.end.y);
        this.graphics.lineTo(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y);
        this.graphics.lineTo(this.linhaAntiNormal.end.x, this.linhaAntiNormal.end.y);
        this.graphics.lineTo(this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.x, this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.y);
        this.graphics.endFill();
    }
};