
"use strict";

class Iman extends Particula{
    constructor(x,y,magnetismo){
        super(x,y);
        this.polo = magnetismo;
        this.forca = Math.abs(magnetismo);

        if(magnetismo > 0){
            this.fillColor = "#ff2200";
            this.strokeColor = "#601000";
        }
        else{
            this.fillColor = "#0022ff";
            this.strokeColor = "#001060";
        }
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