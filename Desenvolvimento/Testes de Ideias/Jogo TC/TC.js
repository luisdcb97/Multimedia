"use strict";
(function () {
    window.addEventListener("load", start);
}());


let ctx;
let cw;
let ch;
let debug;
let pontosArduino;
let pontoInicio;
let pontoFim;
let ys;
let xs;
let lugar;
let tempx;
let tempy;
let pontosProibidos;

function start() {
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    cw = canvas.width;
    ch = canvas.height;
    window.addEventListener("contextmenu", function(event){
        // Se o botao direito do rato for clicado não abre o menu, apenas o abre nas outras ocasioes em que o faria, i.e. premir de uma tecla
        if (event.button === 2){
            event.preventDefault();
        }
    });
    canvas.addEventListener("mousedown", criaPonto);







    pontosArduino = [];
    pontosProibidos = [];

    xs = [12.5,31.5,48.5,67.5,84.5,104.5,122.5,138.5,159.5,176.5,192.5,212.5,230.5,246.5,265.5,283.5,300.5,319.5,337.5,354.5,376.5,393.5,408.5,426.5,444.5,464.5,481.5,498.5,518.5,534.5,554.5,572.5,589.5,607.5,
                624.5,645.5,662.5,681.5,698.5,715.5,733.5,750.5,769.5,787.5];
    ys = [107,127,143,164,182,236,255,273,291,310,365,384,444,460];
    for(let i of xs){
        for(let j of ys){
            pontosArduino.push(new PontoArduino(i,j));
            //pontosArduino.push(new PontoArduino(xs[Math.floor(Math.random()*xs.length)],ys[Math.floor(Math.random()*ys.length)]));
        }
    }
    lugar = Math.floor(Math.random()*pontosArduino.length);
    tempx = pontosArduino[lugar].x;
    tempy = pontosArduino[lugar].y;
    pontosArduino.splice(lugar,1);
    pontoInicio = new PontoArduino(tempx,tempy,"#FFFF00");

    lugar = Math.floor(Math.random()*pontosArduino.length);
    tempx = pontosArduino[lugar].x;
    tempy = pontosArduino[lugar].y;
    pontosArduino.splice(lugar,1);
    pontoFim = new PontoArduino(tempx,tempy,"#2FFE9F");

    for(let i = 0; i < 100 ; i++){
        lugar = Math.floor(Math.random()*pontosArduino.length);
        tempx = pontosArduino[lugar].x;
        tempy = pontosArduino[lugar].y;
        pontosArduino.splice(lugar,1);
        pontosProibidos.push(new PontoArduino(tempx,tempy,"#000000"));
    }


    console.log(pontosArduino);
    console.log(xs);
    debug = true;

    requestAnimationFrame(update);
}


var pontosArray = ["../../../Principal/Recursos/pontoArduino.jpg"]
function criaPonto(event){
    let novo;
    let posicao = getMousePos();

    if(debug){
        console.log("X: " + posicao.x + "\t\tY: " + posicao.y);
    }

    if (event.button === 0) {
        novo = new PontoArduino(posicao.x, posicao.y);
    }
}
let ronda = 1;
let ronda_str = "";

function update() {
    ctx.clearRect(0,0,cw,ch);
    // desenhaLoading();

    ronda = 1;
    ronda++;


    var canvas = document.getElementById("myCanvas");
    ctx.font="50px Kristen ITC";
    // Create gradient
    var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("0","#FFFF00");
    gradient.addColorStop("0.5","#2FFE9F");
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.strokeStyle ="#000000";
    ctx.strokeColor = "#000000";
    ronda_str = ""+ronda;

    ctx.fillText(ronda_str+"ªRONDA!",40,60);
    ctx.strokeText(ronda_str+"ªRONDA!",40,60);



    for (let ponto of pontosArduino){
        ponto.desenha(ctx);
    }
    pontoInicio.desenha(ctx);
    pontoFim.desenha(ctx);
    for (let ponto of pontosProibidos){
        ponto.desenha(ctx);
    }

    requestAnimationFrame(update);
}

function getMousePos(){
    let retangulo = ctx.canvas.getBoundingClientRect();
    return {
        x: window.event.clientX - retangulo.left,
        y: window.event.clientY - retangulo.top
    };
}