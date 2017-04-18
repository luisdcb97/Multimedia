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
    let botoes = document.getElementsByTagName("Button");
    console.log(botoes);

    botoes.interrog.addEventListener("click", showAjuda);
    botoes.porta.addEventListener("click", showMenuPrincipal);
    botoes.fazercadeiras.addEventListener("click",showCadeiras);
}
function showMenuPrincipal(event) {
    /*let frame = document.getElementById("frame");
     frame.style.display = "block";
     frame.src = "../HTML/MenuOpcoes.html";*/
    window.open("../HTML/MenuPrincipal.html","_self");
}

function showAjuda(event) {
    window.open("../HTML/Ajuda.html","_self");
}
function showCadeiras(event) {
    window.open("../HTML/FazerCadeiras.html","_self");
}