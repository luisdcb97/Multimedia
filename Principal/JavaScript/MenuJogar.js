"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let botoes = document.getElementsByTagName("Button");
    console.log(botoes);

    botoes.ano1.addEventListener("click", showBar);
    botoes.voltar.addEventListener("click", showMenuPrincipal);
    //botoes.on.addEventListener("click",meteOnCarregado);
}

function showMenuPrincipal(event) {
    /*let frame = document.getElementById("frame");
     frame.style.display = "block";
     frame.src = "../HTML/MenuOpcoes.html";*/
    window.open("../HTML/MenuPrincipal.html","_self");
}
function showBar(event) {
    window.open("../HTML/Bar.html","_self");
}