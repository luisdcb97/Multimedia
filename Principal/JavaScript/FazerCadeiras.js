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

    botoes.xis.addEventListener("click",showBar);
}

function showBar(event) {
    window.open("../HTML/Bar.html","_self");
}
