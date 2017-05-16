"use strict";

class Particula{
    constructor(x=0, y=0, raio=15, tipo = Particula.NORMAL, strokeColor, fillColor){
        this.x = x;
        this.y = y;
        this.velocidadeX = 0;
        this.velocidadeY = 0;
        this.aceleracaoX = 0;
        this.aceleracaoY = 0;

        this.raio = raio;

        this.strokeColor = strokeColor || Math.random() * 0xffffff;
        let obj = Color.hexToRGB(this.strokeColor);
        let colorObject = Color.getComplementarColor(obj.r, obj.g, obj.b);
        let colorHex = colorObject.r << 16 & colorObject.g << 8 & colorObject.b;
        this.fillColor = fillColor || colorHex || Math.random() * 0xffffff;
    }
}

/* Static types of particles*/
// ALKALI METALS good conductors of heat and electricity, explode if exposed to water, softer than most metals
// ALKALINE EARTH METALS very high melting points, oxides -> basic alkaline solutions, very reactive, not found free in nature
// LANTHANIDES valence electrons in f-shell, rare earth elements
// ACTINIDES valence electrons in f-shell, all radioactive, rare earth elements, mostly man-made
// TRANSITION METALS contain lanthanides and actinides [ iron, cobalt, nickel -> produce magnetic field]
// POST-TRANSITION METALS like transition metals but are softer and conduct poorly
// METALLOID sometimes act as semi-conductors
// NON-METALS dont conduct electicity or heat, only exist as solid or gas, do not reflect light, very brittle
// HALOGENS group 17, subset of non-metals, very chemically reactive, usually found as compounds, salt formers
// NOBLE/INERT chemically stable, colorless, odorless

Particula.NORMAL = 0;
Particula.IMAN = -1;
Particula.ALKALI = 1;
Particula.ALKALINE_EARTH_METAL = 1;
Particula.LANTHANIDE = 2;
Particula.ACTINIDE = 1;
Particula.TRANSITION_METAL = 1;
Particula.POST_TRANSITION_METAL = 1;
Particula.METALLOID = 1;
Particula.NON_METAL = 1;
Particula.HALOGEN = 1;
Particula.NOBLE = 1;
