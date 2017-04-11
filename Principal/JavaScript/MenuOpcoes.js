"use strict";

let debug = true;
let debug_prefix = "[DEBUG - OPCOES]\t";

let definicoes = {
    volume: 1.0,
    muted: false
};

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let voltar = document.getElementById("voltar");
    voltar.addEventListener("click", goBack);

    let mute = document.getElementById("off");
    let play = document.getElementById("on");

    window.addEventListener("message", receiveMessage);

    mute.addEventListener("click", function (ev) {
        definicoes.muted = true;
        let audio = document.getElementsByTagName("audio");
        for( let ad of audio){
            ad.muted = definicoes.muted;
        }
    });

    play.addEventListener("click", function (ev) {
        definicoes.muted = false;
        let audio = document.getElementsByTagName("audio");
        for( let ad of audio){
            ad.muted = definicoes.muted;
        }
    });

    let minus = document.getElementById("menos");
    let plus = document.getElementById("mais");

    plus.addEventListener("click", function (ev) {
        definicoes.volume += 0.05;
        if(definicoes.volume >= 1.0){
            definicoes.volume = 1.0;
        }

        let audio = document.getElementsByTagName("audio");
        for( let ad of audio){
            ad.volume = definicoes.volume;
        }
    });

    minus.addEventListener("click", function (ev) {
        definicoes.volume -= 0.05;
        if(definicoes.volume <= 0.0){
            definicoes.volume = 0.0;
        }

        let audio = document.getElementsByTagName("audio");
        for( let ad of audio){
            ad.volume = definicoes.volume;
        }
    });
}

function receiveMessage(ev) {
    if (debug){
        console.debug(ev.origin);
        console.debug(debug_prefix + "ev.data" + JSON.stringify(ev.data, null, 4));
        console.debug(debug_prefix + "definicoes" + JSON.stringify(definicoes, null, 4));
    }

    definicoes.volume = ev.data.volume;
    definicoes.muted = ev.data.muted;

    let audio = document.getElementsByTagName("audio");
    for( let ad of audio){
        ad.volume = definicoes.volume;
        ad.muted = definicoes.muted;
    }

    if (debug){
        console.debug(debug_prefix + "definicoes" + JSON.stringify(definicoes, null, 4));
    }
}

function goBack(ev) {
    parent.postMessage(definicoes, "*");
}
