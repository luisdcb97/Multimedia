"use strict";

let definicoes = {
    volume: 1.0,
    muted: false
};

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let voltar = document.getElementById("BotaoVoltarOpcoes");
    voltar.addEventListener("click", goBack);

}

function goBack(ev) {
    parent.postMessage(definicoes, "*");
}
