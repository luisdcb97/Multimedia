"use strict";

let debug = true;
let debug_prefix = "[DEBUG - PRINCIPAL]\t";

let definicoes = {
    volume: 0.25,
    muted: false
};

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

    window.addEventListener("message", hideFrame);
}

function showOpcoes() {
    let menu = document.getElementById("MenuPrincipal");
    let frame = document.getElementById("frame");

    frame.src = "../HTML/MenuOpcoes.html";
    frame.addEventListener("load", function (ev) {
        frame.contentWindow.postMessage(definicoes, "*");
    });

    menu.style.display = "none";
    frame.style.display = "block";

}

function hideFrame(ev) {
    let menu = document.getElementById("MenuPrincipal");
    let frame = document.getElementById("frame");
    frame.src = "";
    if (debug) {
        console.debug(debug_prefix + "frame hidden");
    }
    menu.style.display = "block";
    frame.style.display = "none";
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