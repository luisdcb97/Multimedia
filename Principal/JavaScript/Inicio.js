"use strict";

let debug = true;
let debug_prefix = "[DEBUG]\t";

let timeoutTextIds=[];

let definicoes = {
    volume: 0.25,
    muted: false
};

let jogador = {
    dinheiro: 50,
    energia: 100,
    alteraDinheiro: function (valor) {
        if (this.dinheiro + valor < 0){
            return false;
        }
        this.dinheiro += valor;
        return true;
    },
    alteraEnergia: function (valor) {
        if (this.energia == 0 || this.energia == 100){
            return false;
        }

        this.dinheiro += valor;
        if (this.energia < 0 ){
            this.energia = 0;
        }
        else if(this.energia > 100){
            this.energia = 100;
        }
        return true;
    }
};

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let botaoJogar = document.getElementById("BotaoJogar");
    let botaoAjuda = document.getElementById("BotaoAjuda");
    let botaoOpcoes = document.getElementById("BotaoOpcoes");
    let botaoSair = document.getElementById("BotaoSair");
    let botaoVoltarAjuda = document.getElementById("BotaoVoltarAjuda");
    let botaoVoltarOpcoes = document.getElementById("BotaoVoltarOpcoes");

    botaoJogar.addEventListener("click", function (event) {
        changeSection(event, document.getElementById("Bar"));
        botaoVoltarAjuda.removeEventListener("click", goBackMain);
        botaoVoltarOpcoes.removeEventListener("click", goBackMain);

        botaoVoltarAjuda.addEventListener("click", goBackBar);
        botaoVoltarOpcoes.addEventListener("click", goBackBar);
    });

    botaoAjuda.addEventListener("click", function (event) {
        changeSection(event, document.getElementById("Ajuda"))
    });
    botaoOpcoes.addEventListener("click", function (event) {
        changeSection(event, document.getElementById("Opcoes"))
    });
    botaoVoltarAjuda.addEventListener("click", goBackMain);
    botaoVoltarOpcoes.addEventListener("click", goBackMain);
    botaoSair.addEventListener("click", function (eve) {
        window.close();
    });
    addListenersOpcoes();
    addListenersBar();
}

function addListenersBar() {
    let botaoAjuda= document.getElementById("BotaoInterrogacaoBar");
    let botaoOpcoes = document.getElementById("BotaoSomBar");
    let botaoSair = document.getElementById("BotaoSairBar");
    let senhora = document.getElementById("BotaoSenhoraBar");


    botaoAjuda.addEventListener("click", function(event){
        changeSection(event, document.getElementById("Ajuda"));
    });

    botaoOpcoes.addEventListener("click", function(event){
        changeSection(event, document.getElementById("Opcoes"));
    });

    botaoSair.addEventListener("click", function (event) {
        window.close();
    });

    senhora.addEventListener("click", showBaguetes);

    let botaoFecharBaguetes = document.getElementById("FecharBaguetes");

    botaoFecharBaguetes.addEventListener("click", hideBaguetes);

    let bagueteQueijo = document.getElementById("Queijo");
    bagueteQueijo.addEventListener("click", function (event) {
        let alterado = compraBaguete(3, 30);
        if(alterado){
            alteraDadosJogador();
        }
    });
    alteraDadosJogador();
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

function getVisibleSection(){
    let sections = document.getElementsByTagName("section");
    for (let head of sections) {
        if(head.style.display !== "none"){
            return head;
        }
    }
    return null;
}

function changeSection(event, section) {
    let current = getVisibleSection();
    current.style.display = "none";
    section.style.display = "block";
    return current;
}

function goBackMain(event) {
    let current = getVisibleSection();
    let section = document.getElementById("MenuPrincipal");

    section.style.display = "block";
    current.style.display = "none";
}

function goBackBar(event) {
    let current = getVisibleSection();
    let section = document.getElementById("Bar");

    section.style.display = "block";
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

function compraBaguete(preco, energia){
    for (let id1 of timeoutTextIds){
        clearTimeout(id1);
    }
    timeoutTextIds = [];

    let compra;
    let visor = document.getElementById("Visor");
    if (!jogador.alteraDinheiro(-preco)) {
        alteraTexto(visor, "Não tem saldo suficiente!", 10);
        compra = false;
    }
    else{
        jogador.alteraEnergia(energia);
        alteraTexto(visor, "Compra efetuada!", 10);
        compra = true;
    }

    let id = setTimeout(function () {
        alteraTexto(visor, "Efetue a sua compra.");
    }, 1500);
    timeoutTextIds.push(id);
    return compra;
}

function alteraTexto(par, subst, timestep = 25) {
    let time = 0;
    for( let i = par.innerHTML.length-1; i > 0; i--){
        let id = setTimeout(function () {
            par.innerHTML = par.innerHTML.slice(0, -1);
        }, time);
        timeoutTextIds.push(id);
        time += timestep;
    }

    let id = setTimeout(function () {
        par.innerHTML = subst.charAt(0);
    }, time);
    timeoutTextIds.push(id);
    time += timestep;

    for( let j = 1; j < subst.length; j++){
        let char = subst.charAt(j);
        let id = setTimeout(function () {
            par.innerHTML = par.innerHTML + char;
        }, time);
        timeoutTextIds.push(id);
        time+= timestep;
    }
}

function alteraDadosJogador() {
    let saldo = document.getElementById("DinheiroValor");
    let energia = document.getElementById("Energia");

    saldo.innerHTML = jogador.dinheiro;
    // TODO mudar o icone da barra de energia consoante a energia do jogador
    if (jogador.energia === 100){

    }
    else if(jogador.energia >= 75){

    }
    else if(jogador.energia >= 50){

    }
    else if(jogador.energia >= 25){

    }
    else if(jogador.energia >= 0){

    }
}

function showBaguetes(event){
    let baguetes = document.getElementById("CompraBaguetes");
    baguetes.style.display = "block";
    let visor = document.getElementById("Visor");
    visor.innerHTML = "Efetua a sua compra."
}

function hideBaguetes(event){
    for (let id1 of timeoutTextIds){
        clearTimeout(id1);
    }
    timeoutTextIds = [];

    let baguetes = document.getElementById("CompraBaguetes");
    baguetes.style.display = "none";
}