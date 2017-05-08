"use strict";

class PontoArduino{
    constructor(x,y,cor="#666677"){
        this.x = x;
        this.y = y;
        this.raio = 5;

        this.strokeColor = "#000000";
        this.fillColor = cor;

    }

    desenha(contexto) {
        contexto.save();

        contexto.fillStyle = this.fillColor;
        contexto.strokeStyle = this.strokeColor;
        contexto.beginPath();
        contexto.arc(this.x, this.y, this.raio, 0, 2*Math.PI);
        contexto.fill();
        contexto.stroke();

        contexto.restore();
    }
}