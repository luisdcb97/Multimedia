"use strict";

class Iman extends Particula{
    constructor(x=0, y=0, raio=15, magnetismo){
        super(x,y, raio, Particula.IMAN);
        this.polo = magnetismo;
        this.forca = Math.abs(magnetismo);
        this.multiplicadorDistancia = 2;

        if(magnetismo > 0){
            this.fillColor = 0xff2200;
            this.strokeColor = 0x601000;
        }
        else{
            this.fillColor = 0x0022ff;
            this.strokeColor = 0x001060;
        }
    }

    aplicaForca(x, y){
        let distancia = Math.sqrt(Math.pow(x-this.x, 2) + Math.pow(y-this.y, 2));
        let forca = this.polo * (1 / distancia);

        let angle = Math.asin((this.x-x)/distancia);
        let forceX, forceY;
        forceX = forca * Math.sin(angle);
        forceY = forca * Math.cos(angle);

        let obj = {
            iman: this,
            x: x,
            y: y,
            fx: forceX,
            fy: forceY,
            f: forca,
            o: angle,
            d: distancia
        };
        console.log(obj);
        return {fX:forceX, fY:forceY};
    }
}