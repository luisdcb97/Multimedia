"use strict";
/**
 * Created by Luis David on 15/03/2017.
 */

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let botoes = document.getElementsByTagName("Button");
    console.log(botoes);

    botoes.ajuda.addEventListener("click", showAjuda);
}

function showAjuda(event) {
    let frame = document.getElementById("frame");
    frame.style.display = "block";
    frame.src = "../HTML/MenuOpcoes.html";
}