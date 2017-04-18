"use strict";

let debug = true;
let debug_prefix = "[DEBUG - PRINCIPAL]\t";

let definicoes = {
    volume: 0.25,
    muted: false
};

let navegacao = [];

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let opcoes = document.getElementById("opcoes");
    opcoes.addEventListener("click", showOpcoes);
    let jogar = document.getElementById("jogar");
    jogar.addEventListener("click", showJogar);
    let ajuda = document.getElementById("ajuda");
    ajuda.addEventListener("click", showAjuda);
    let sair = document.getElementById("sair");
    sair.addEventListener("click", function(){window.close();} );

    let frame = document.getElementById("frame");
    frame.src = "";

    window.addEventListener("message", hideFrame);
}

function showOpcoes() {
    let menu = document.getElementById("MenuPrincipal");
    let frame = document.getElementById("frame");

    console.log(frame.src);
    navegacao.push(frame.src);
    if(frame.src === "file:///C:/Users/Luis%20David/Programacao/2%C2%BA%20Ano/Multimedia/LEIdaBaguete/Principal/HTML/MenuPrincipal.html") {
        console.log(navegacao);
        menu.style.display = "none";
        frame.style.display = "block";
    }
    frame.src = "../HTML/MenuOpcoes.html";
    frame.addEventListener("load", function (ev) {
        frame.contentWindow.postMessage(definicoes, "*");
    });


}

function hideFrame(ev) {
    let menu = document.getElementById("MenuPrincipal");
    let frame = document.getElementById("frame");
    frame.src = navegacao.pop();
    console.log(frame.src);
    if (debug) {
        console.debug(debug_prefix + "frame hidden");
    }
    if(frame.src === "file:///C:/Users/Luis%20David/Programacao/2%C2%BA%20Ano/Multimedia/LEIdaBaguete/Principal/HTML/MenuPrincipal.html"){
        menu.style.display = "block";
        frame.style.display = "none";
    }
}

function showJogar(event) {
    window.open("../HTML/MenuJogar.html","_self");
}

function showAjuda() {
    let menu = document.getElementById("MenuPrincipal");
    let frame = document.getElementById("frame");

    frame.src = "../HTML/Ajuda.html";
    frame.addEventListener("load", function (ev) {
        frame.contentWindow.postMessage(definicoes, "*");
    });

    menu.style.display = "none";
    frame.style.display = "block";
}