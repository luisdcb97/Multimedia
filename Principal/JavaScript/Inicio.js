"use strict";

let debug = true;
let debug_prefix = "[DEBUG]\t";

let definicoes = {
    volume: 0.25,
    muted: false
};

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let botaoAjuda = document.getElementById("BotaoAjuda");
    let botaoOpcoes = document.getElementById("BotaoOpcoes");
    let botaoSair = document.getElementById("BotaoSair");
    let botaoVoltarAjuda = document.getElementById("BotaoVoltarAjuda");
    let botaoVoltarOpcoes = document.getElementById("BotaoVoltarOpcoes");

    botaoAjuda.addEventListener("click", function (event) {
        changeHeader(event, document.getElementById("Ajuda"))
    });
    botaoOpcoes.addEventListener("click", function (event) {
        changeHeader(event, document.getElementById("Opcoes"))
    });
    botaoVoltarAjuda.addEventListener("click", goBackMain);
    botaoVoltarOpcoes.addEventListener("click", goBackMain);
    botaoSair.addEventListener("click", function (eve) {
        window.close();
    });
    addListenersOpcoes();
}

function addListenersOpcoes(){
    let botaoOn = document.getElementById("BotaoOn");
    let botaoOff = document.getElementById("BotaoOff");
    let botaoMais = document.getElementById("BotaoMais");
    let botaoMenos = document.getElementById("BotaoMenos");

    botaoOn.addEventListener("click", function (event) {
        definicoes.muted = true;

        for (let audio of document.getElementsByTagName("audio")) {
            audio.muted = definicoes.muted;
        }

        if(botaoOn.disabled === false && definicoes.muted === true){
            botaoOn.disabled = true;
            botaoOff.disabled = false;
        }

        if (debug){
            console.log(debug_prefix + "Sound Muted");
        }
    });

    botaoOff.addEventListener("click", function (event) {
        definicoes.muted = false;

        for (let audio of document.getElementsByTagName("audio")) {
            audio.muted = definicoes.muted;
        }

        if(botaoOff.disabled === false && definicoes.muted === false){
            botaoOff.disabled = true;
            botaoOn.disabled = false;
        }

        if (debug){
            console.log(debug_prefix + "Sound Unmuted");
        }
    });

    botaoMais.addEventListener("click", function (event) {
        changeVolume(5);
        if(botaoMais.disabled === false && definicoes.volume === 1){
            botaoMais.disabled = true;
        }
        if(botaoMenos.disabled === true && definicoes.volume !== 0){
            botaoMenos.disabled = false;
        }

        if (debug){
            console.log(debug_prefix + "Volume Increased to " + definicoes.volume);
        }
    });

    botaoMenos.addEventListener("click", function (event) {
        changeVolume(-5);
        if(botaoMenos.disabled === false && definicoes.volume === 0){
            botaoMenos.disabled = true;
        }
        if(botaoMais.disabled === true && definicoes.volume !== 1){
            botaoMais.disabled = false;
        }

        if (debug){
            console.log(debug_prefix + "Volume Decreased to " + definicoes.volume);
        }
    });

}

function getVisibleHeader(){
    let headers = document.getElementsByTagName("header");
    for (let head of headers) {
        if(head.style.display !== "none"){
            return head;
        }
    }
    return null;
}

function changeHeader(event, header) {
    let current = getVisibleHeader();
    current.style.display = "none";
    header.style.display = "block";

}

function goBackMain(event) {
    let current = getVisibleHeader();
    let header = document.getElementById("MenuPrincipal");

    header.style.display = "block";
    current.style.display = "none";
}

function changeVolume(change){
    let volume = definicoes.volume;
    if (change < -100 || change > 100){
        throw new RangeError;
    }
    change = change / 100;

    if(volume + change > 1){
        definicoes.volume = 1;
    }
    else if(volume + change < 0){
        definicoes.volume = 0;
    }
    else{
        definicoes.volume = volume + change;
    }

    for (let audio of document.getElementsByTagName("audio")) {
        audio.volume = definicoes.volume;
    }
}