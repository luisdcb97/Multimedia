"use strict";

let debug = true;
let debug_prefix = "[DEBUG]\t";

let definicoes = {
    volume: 0.25,
    muted: false
};

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let botaoAjuda = document.getElementById("BotaoAjuda");
    let botaoVoltar = document.getElementById("BotaoVoltar");

    botaoAjuda.addEventListener("click", showAjuda);
    botaoVoltar.addEventListener("click", goBack);
}

function showAjuda(event) {
    let principal = document.getElementById("MenuPrincipal");
    let ajuda = document.getElementById("Ajuda");

    principal.style.display = "none";
    ajuda.style.display = "block";

}

function goBack(event) {
    let principal = document.getElementById("MenuPrincipal");
    let ajuda = document.getElementById("Ajuda");

    principal.style.display = "block";
    ajuda.style.display = "none";
}