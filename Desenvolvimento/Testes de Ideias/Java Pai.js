/**
 * Created by Luis David on 18/03/2017.
 */
"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let janela = window.open("./Pagina Filho.html","_blank");
    setTimeout(function () {
        append(janela);
    },0);
}

function append(nome){
    nome.focus();
    window.name = "daddy";
    nome.postMessage("sup bro", "*");
    window.close();
}