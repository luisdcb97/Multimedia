/**
 * Created by Luis David on 20/03/2017.
 */
"use strict";

class Particula{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.velocidadeX = Math.random()*5 -2.5;
        this.velocidadeY = Math.random()*5 -2.5;
        this.aceleracaoX = 0;
        this.aceleracaoY = 0;
        this.raio = 10;

        let r = Math.round(Math.random() * 100);
        let g = Math.round(Math.random() * 100);
        let b = Math.round(Math.random() * 100);
        this.strokeColor = "rgba(" + r + ", " + g + ", " + b + ", " + 255 +")";
        this.fillColor = "#ffffff";


    }

    atualizaPosicao(contexto){
        this.velocidadeX += this.aceleracaoX;
        this.velocidadeY += this.aceleracaoY;
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        this.verificaLimites(contexto);
    }

    desenha(contexto){
        contexto.save();

        contexto.fillStyle = this.strokeColor;
        contexto.strokeStyle = this.strokeColor;

        let ang = 1/6 * 2 * Math.PI;
        for(let i = 0; i < 6; i++){
            contexto.beginPath();
            ctx.lineTo(this.x +this.raio * Math.cos(i*ang),this.y +this.raio * Math.sin(i*ang));
            contexto.arc(this.x, this.y, this.raio, i * ang, (i+1) * ang);
            ctx.lineTo(this.x ,this.y );
            contexto.stroke();
            if(i%2 == 0){
                contexto.fill();
            }
        }

        contexto.restore();
    }

    verificaColisao(particulas){
        for(let part of particulas){
            let deltaX = part.x - this.x;
            deltaX = Math.pow(deltaX, 2);
            let deltaY = part.y - this.y;
            deltaY = Math.pow(deltaY, 2);
            let deltaR = part.raio + this.raio;
            deltaR = Math.pow(deltaR, 2);

            if(deltaX + deltaY <= deltaR){
                return true;
            }
        }

        return false;
    }

    verificaLimites(contexto){
        if (this.x +this.raio>= contexto.width || this.x - this.raio<= 0){
            this.aceleracaoX = -this.aceleracaoX;
            this.velocidadeX = -this.velocidadeX;
        }
        if (this.y +this.raio>= contexto.height || this.y - this.raio<= 0){
            this.aceleracaoY = -this.aceleracaoY;
            this.velocidadeY = -this.velocidadeY;
        }
    }
}