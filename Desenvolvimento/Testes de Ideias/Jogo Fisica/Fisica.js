
"use strict";
(function () {
    window.addEventListener("load", start);
}());

let debug = true;

let ctx;
let cw;
let ch;

let framecount; // Numero de frames TODO mudar isto para um objeto do jogo principal e receber do jogo

let particulas;
let imans;

let pos = 0;

function start() {
    let canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    cw = canvas.width;
    ch = canvas.height;
    window.addEventListener("contextmenu", function(event){
        // Se o botao direito do rato for clicado não abre o menu, apenas o abre nas outras ocasioes em que o faria, i.e. premir de uma tecla
        if (event.button === 2){
            event.preventDefault();
        }
    });
    canvas.addEventListener("mousedown", criaIman);

    framecount = 0;
    particulas = [];
    imans = [];
    for(let i = 0; i< 25; i++){
        particulas.push(new Particula(cw*Math.random(), ch*Math.random()));
    }
    console.log(particulas);

    requestAnimationFrame(update);
}

function update() {
    ctx.clearRect(0,0,cw,ch);
    // desenhaLoading();

    for (let particula of particulas){
        //particula.atualizaPosicao(ctx);
        particula.desenha(ctx);
    }

    for (let im of imans){
        im.desenha(ctx);
    }

    if(framecount%600 === 0 && debug){
        console.info(particulas);
        console.info(imans);
    }

    framecount++;
    requestAnimationFrame(update);
}

function desenhaLoading(){
    let ang = 0.02;
    ctx.beginPath();
    ctx.arc(cw/2,ch/2,20,0,2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cw/2+(20)*Math.cos(pos), ch/2+(20)*Math.sin(pos));
    ctx.lineTo(cw/2+(20+5)*Math.cos(pos), ch/2+(20+5)*Math.sin(pos));
    ctx.lineTo(cw/2+(20+5)*Math.cos(pos-0.1), ch/2+(20+5)*Math.sin(pos-0.1));
    ctx.lineTo(cw/2+(20)*Math.cos(pos-0.1), ch/2+(20)*Math.sin(pos-0.1));
    ctx.fill();

    let guarda = ctx.strokeStyle;
    ctx.strokeStyle = "#ff0000";

    ctx.beginPath();
    ctx.arc(cw/2,ch/2,20,0,pos);
    ctx.stroke();

    ctx.strokeStyle = guarda;

    if(framecount%1 === 0){
        pos += ang;
        if( pos >= 2*Math.PI){
            pos = 2*Math.PI - pos +ang;
        }
    }

}

function criaIman(event){
    let novo;
    let posicao = getMousePos();

    if(debug){
        console.log("X: " + posicao.x + "\t\tY: " + posicao.y);
    }

    if (event.button === 0){
        novo = new Iman(posicao.x, posicao.y, 5);
    }
    else if(event.button === 2){
        novo = new Iman(posicao.x, posicao.y, -5);
    }

    if(!(novo.verificaColisao(imans) || novo.verificaColisao(particulas))){
        imans.push(novo);
    }
    else{
        console.warn("ia sobrepor uma particula");
    }
}

function getMousePos(){
    let retangulo = ctx.canvas.getBoundingClientRect();
    return {
        x: window.event.clientX - retangulo.left,
        y: window.event.clientY - retangulo.top
    };
}
