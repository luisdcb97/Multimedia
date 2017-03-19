/**
 * Created by Luis David on 18/03/2017.
 */
"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    window.addEventListener("message", recebeMensagem);
}

function recebeMensagem(ev) {
    console.log(ev.data);
    console.log(ev.source.name);
}