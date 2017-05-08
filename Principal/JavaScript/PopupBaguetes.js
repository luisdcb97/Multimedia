"use strict";

let debug = true;
let debug_prefix = "[DEBUG - PRINCIPAL]\t";
var precoBagueteQueijo = 3;
var saldo = 0;
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

    botoes.xis.addEventListener("click",hidePopup);
    botoes.bagueteQueijo.addEventListener("click",compraBagueteQueijo);
    window.addEventListener("message", function (event) {
        saldo = event.data;
    });
}

function compraBagueteQueijo(){

    if (saldo < precoBagueteQueijo) {
        window.alert("Não tem saldo suficiente!");
    }
    else{
        saldo = saldo - precoBagueteQueijo;
    }
}

function hidePopup(ev) {
    parent.postMessage(saldo,"*");
}