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

    botoes.xis.addEventListener("click",hidePopup);
}

function hidePopup(ev) {
    let frame = document.getElementById("popupbaguetes");
    frame.src = "../HTML/PopupBaguetes.html";
    frame.style.display = "none";
}
