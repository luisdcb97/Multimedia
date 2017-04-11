"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let botoes = document.getElementsByTagName("Button");
    console.log(botoes);

    botoes.voltar.addEventListener("click", showMenuPrincipal);
    //botoes.on.addEventListener("click",meteOnCarregado);
}

function showMenuPrincipal(event) {
    /*let frame = document.getElementById("frame");
     frame.style.display = "block";
     frame.src = "../HTML/MenuOpcoes.html";*/
    window.open("../HTML/MenuPrincipal.html","_self");
}
