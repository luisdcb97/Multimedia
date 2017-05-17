"use strict";

let LoadState = {
    preload: function () {
        this.load.image('tituloFisica',"../Recursos/Fisica luis.png");

    },
    create: function () {
        let title = gameFisica.add.sprite(50,50, "tituloFisica");
        title.scale.setTo(0.25, 0.6);
        gameFisica.time.events.add(Phaser.Timer.SECOND * 5, function () {
           gameFisica.state.start("PlayState");
        }, this);
    },
    update: function () {

    },
};

/**
 * A 2D Graphic of a rotating circle with an arrow at its front
 */
class LoadingCircle{
    /**
     *
     * @param {Number} x Posicao Horizontal da circunferencia
     * @param {Number} y Posicao Vertical da circunferencia
     * @param {Number} radius Raio da circunferencia
     * @param {Number} deltaAngle Alteracao angular da seta [deg]
     * @param {Phaser.Graphics} graphics Graficos phaser onde ira desenhar o circulo [Cria um  na posicao 0,0 caso nao seja fornecido]
     * @param {Number} circlePieces Numero de riscos usados para representar o circulo
     * @param {Number} arrowLength Comprimento da Seta
     * @param {Number} arrowWidth Raio da base da Seta
     * @param {Number} circleLineWidth Tamanho do stroke da circunferencia
     * @param {Number} circleLineColor Cor da circunferencia
     * @param {Number} arrowLineColor Cor das linhas da Seta
     * @param {Number} arrowFillColor cor de preenchimento da seta
     */
    constructor(x, y, radius, deltaAngle, graphics=null, circlePieces=20, arrowLength=6, arrowWidth=4, circleLineWidth=2, circleLineColor=0x438C57,
                arrowLineColor=0x401212, arrowFillColor=0xcc0000) {

        if (graphics === null) {
            this.graphics = gameFisica.add.graphics(0, 0);
        }
        else {
            this.graphics = graphics;
        }

        this.circle = new Phaser.Circle(x, y, radius);

        this.arrowLength = arrowLength;
        this.arrowWidth = arrowWidth;
        this.circleLineWidth = circleLineWidth;
        this.circlePieces = circlePieces;


        this.angle = 0;
        this.deltaAngle = deltaAngle;

        this.circleLineColor = circleLineColor;
        this.arrowLineColor = arrowLineColor;
        this.arrowFillColor = arrowFillColor;
    }

    /**
     * Draws the LoadingCircle and updates its angle
     */
    redraw() {
        this.drawCircle();
        this.drawArrow();
        this.angle += this.deltaAngle;
    }

    /**
     * Draws the circle part of the LoadingCircle
     */
    drawCircle(){
        for (let i = 0, alphaDecrease = 1 / this.circlePieces, angleChange = 360 / (2*this.circlePieces); i < this.circlePieces; i++) {
            this.graphics.lineStyle(this.circleLineWidth, this.circleLineColor, 1 - i * alphaDecrease);
            this.graphics.arc(
                this.circle.x,
                this.circle.y,
                this.circle.radius,
                Phaser.Math.degToRad(this.angle - 2 * i  * angleChange),
                Phaser.Math.degToRad(this.angle - ( 2 * i + 1 ) * angleChange),
                true
            );
        }
    }

    /**
     * Draws the arrow part of the LoadingCircle
     */
    drawArrow(){
        this.graphics.lineStyle(this.circleLineWidth, this.arrowLineColor, 1);

        this.linhaComprimento = new Phaser.Line(
            this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x,
            this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y,
            this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.x,
            this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle + this.arrowLength)) + this.circle.y
        );

        this.linhaNormal = new Phaser.Line(0, 0, 0, 0);
        this.linhaNormal.fromAngle(
            this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x,
            this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y,
            this.linhaComprimento.normalAngle,
            this.arrowWidth
        );

        this.linhaAntiNormal = new Phaser.Line(0, 0, 0, 0);
        this.linhaAntiNormal.fromAngle(
            this.circle.radius * Math.cos(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.x,
            this.circle.radius * Math.sin(Phaser.Math.degToRad(this.angle - this.arrowLength)) + this.circle.y,
            this.linhaComprimento.normalAngle,
            -this.arrowWidth
        );

        this.graphics.moveTo(
            this.linhaComprimento.end.x,
            this.linhaComprimento.end.y
        );

        this.graphics.beginFill(this.arrowFillColor, 1);
        this.graphics.lineTo(this.linhaNormal.end.x, this.linhaNormal.end.y);
        this.graphics.lineTo(this.linhaAntiNormal.end.x, this.linhaAntiNormal.end.y);
        this.graphics.lineTo(
            this.linhaComprimento.end.x,
            this.linhaComprimento.end.y
        );
        this.graphics.endFill();
    }
}