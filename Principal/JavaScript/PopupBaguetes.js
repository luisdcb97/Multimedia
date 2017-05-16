"use strict";

let debug = true;
let debug_prefix = "[DEBUG - PRINCIPAL]\t";
var precoBagueteQueijo = 3;
var precoBagueteAtum = 4;
var precoBagueteBacon = 4;
var saldo = 0;
let definicoes = {
    volume: 0.25,
    muted: false
};
var eatingsound = new Audio("../Recursos/eatingsound.mp3");

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let botoes = document.getElementsByTagName("Button");
    console.log(botoes);

    botoes.xis.addEventListener("click",hidePopup);
    botoes.bagueteQueijo.addEventListener("click",compraBagueteQueijo);
    botoes.bagueteAtum.addEventListener("click",compraBagueteAtum);
    botoes.bagueteBacon.addEventListener("click",compraBagueteBacon);
    window.addEventListener("message", function (event) {
        saldo = event.data;
    });
}

function compraBagueteQueijo(){
    if (saldo < precoBagueteQueijo) {
        window.alert("Não tem dinheiro suficiente!");
    }
    else{
        saldo = saldo - precoBagueteQueijo;

    }
}
function compraBagueteAtum(){
    if (saldo < precoBagueteAtum) {
        window.alert("Não tem dinheiro suficiente!");
    }
    else{
        saldo = saldo - precoBagueteAtum;
    }
}
function compraBagueteBacon(){
    if (saldo < precoBagueteBacon) {
        window.alert("Não tem dinheiro suficiente!");
    }
    else{
        saldo = saldo - precoBagueteBacon;
    }
}

function hidePopup(ev) {
    parent.postMessage(saldo,"*");
}