"use strict";

class Cabo{
    constructor(x,y,entrada,saida){
        this.x = x;
        this.y = y;
        this.entrada = entrada;
        this.saida = saida;
    }
    //       2
    //    0     1
    //       3
    alteraRotacao(entrada,saida){
        if (this.entrada == 0 && this.saida == 1){
            this.entrada = 2;
            this.saida = 3;
        }
        else if (this.entrada == 2 && this.saida == 3){
            this.entrada = 1;
            this.saida = 0;
        }
        else if (this.entrada == 1 && this.saida == 0){
            this.entrada = 3;
            this.saida = 2;
        }
        else if (this.entrada == 3 && this.saida == 2){
            this.entrada = 0;
            this.saida = 1;
        }
        else if (this.entrada == 0 && this.saida == 2){
            this.entrada = 2;
            this.saida = 1;
        }
        else if (this.entrada == 2 && this.saida == 1){
            this.entrada = 1;
            this.saida = 3;
        }
        else if (this.entrada == 1 && this.saida == 3){
            this.entrada = 3;
            this.saida = 0;
        }
        else if (this.entrada == 3 && this.saida == 0){
            this.entrada = 0;
            this.saida = 2;
        }
    }
}