"use strict";

class Cabo{
    constructor(x,y,rotacao,entrada,saida){
        this.x = x;
        this.y = y;
        this.rotacao = rotacao;
        this.entrada = entrada;
        this.saida = saida;
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