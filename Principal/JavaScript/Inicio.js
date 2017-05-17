"use strict";

let debug = true;
let debug_prefix = "[DEBUG]\t";

var imgFolder= "../Recursos/introducao";
let resourcePrefix = "../";

let timeoutTextIds=[];

let definicoes = {
    volume: 0.25,
    muted: false
};

let jogador = {
    dinheiro: 50,
    energia: 100,
    cadeiras:{
        TC:false,
        Fisica:false,
        AMI:false,
    },
    baguetes:{
        Bacon:false,
        Atum:false,
        Queijo:false,
    },
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

        this.energia += valor;
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
    var foto = document.getElementById("foto");
    foto.src = imgFolder + "1.png";
    foto.addEventListener("click",introducao);

    let botaoJogar = document.getElementById("BotaoJogar");
    let botaoAjuda = document.getElementById("BotaoAjuda");
    let botaoOpcoes = document.getElementById("BotaoOpcoes");
    let botaoSair = document.getElementById("BotaoSair");
    let botaoVoltarAjuda = document.getElementById("BotaoVoltarAjuda");
    let botaoVoltarOpcoes = document.getElementById("BotaoVoltarOpcoes");



    botaoJogar.addEventListener("click", function (event) {
        changeSection(event, document.getElementById("MenuAnos"));
    });

    botaoAjuda.addEventListener("click", function (event) {
        changeSection(event, document.getElementById("Ajuda"));
    });
    botaoOpcoes.addEventListener("click", function (event) {
        changeSection(event, document.getElementById("Opcoes"));
    });
    botaoVoltarAjuda.addEventListener("click", goBackMain);
    botaoVoltarOpcoes.addEventListener("click", goBackMain);
    botaoSair.addEventListener("click", function (eve) {
        window.close();
    });

    addListenersOpcoes();
    addListenersMenuAnos();
    addListenersBar();

    for (let audio of document.getElementsByTagName("audio")) {
        audio.volume = definicoes.volume;
        audio.muted = definicoes.muted;
    }
}

function introducao(){
    var foto = document.getElementById("foto");
    foto.src = imgFolder + "2.png";

    foto.addEventListener("click", function () {
        changeSection(event, document.getElementById("MenuPrincipal"));
    })
}


function addListenersMenuAnos() {
    let botaoAno1 = document.getElementById("Ano1");
    let botaoAno2 = document.getElementById("Ano2");
    let botaoAno3 = document.getElementById("Ano3");
    let botaoVoltar = document.getElementById("VoltarAnos");

    botaoAno2.disabled=true;
    botaoAno3.disabled=true;

    botaoVoltar.addEventListener("click", function (event) {
        changeSection(event, document.getElementById("MenuPrincipal"));
    });

    botaoAno1.addEventListener("click", function (event) {
        changeSection(event, document.getElementById("Bar"));
        let botaoVoltarAjuda = document.getElementById("BotaoVoltarAjuda");
        let botaoVoltarOpcoes = document.getElementById("BotaoVoltarOpcoes");
        botaoVoltarAjuda.removeEventListener("click", goBackMain);
        botaoVoltarOpcoes.removeEventListener("click", goBackMain);

        botaoVoltarAjuda.addEventListener("click", goBackBar);
        botaoVoltarOpcoes.addEventListener("click", goBackBar);
    });

}

function addListenersBar() {
    let botaoSom = document.getElementById("BotaoSomBar");
    let botaoAjuda= document.getElementById("BotaoInterrogacaoBar");
    let botaoOpcoes = document.getElementById("BotaoOpcoesBar");
    let botaoSair = document.getElementById("BotaoSairBar");
    let senhora = document.getElementById("BotaoSenhoraBar");
    let botaoFC = document.getElementById("BotaoCadeirasBar");

    if(definicoes.muted){
        botaoSom.style.filter = "grayscale(65%)";
    }
    else{
        botaoSom.style.filter = "grayscale(0%)";
    }

    botaoSom.addEventListener("click", function (event) {
        switchAudioOutput();
        if(definicoes.muted){
            botaoSom.style.filter = "grayscale(65%)";
        }
        else{
            botaoSom.style.filter = "grayscale(0%)";
        }
    });

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
    let bagueteAtum = document.getElementById("Atum");
    bagueteAtum.addEventListener("click", function (event) {
        let alterado = compraBaguete(4, 30);
        if(alterado){
            alteraDadosJogador();
        }
    });
    let bagueteBacon = document.getElementById("Bacon");
    bagueteBacon.addEventListener("click", function (event) {
        let alterado = compraBaguete(4, 30);
        if(alterado){
            alteraDadosJogador();
        }
    });
    alteraDadosJogador();


    botaoFC.addEventListener("click", showCadeiras);
    let botaoFecharFC = document.getElementById("FecharFazerCadeiras");
    botaoFecharFC.addEventListener("click",hideCadeiras);

    let tc = document.getElementById("TC");
    tc.addEventListener("click", function (event) {
        showGame(800, 540, "TC");
    })
}

function addListenersOpcoes(){
    let botaoOn = document.getElementById("BotaoOn");
    let botaoOff = document.getElementById("BotaoOff");
    let botaoMais = document.getElementById("BotaoMais");
    let botaoMenos = document.getElementById("BotaoMenos");

    document.getElementById("TextoVolume").innerHTML = Math.round(definicoes.volume * 100).toString();

    botaoOn.addEventListener("click", function (event) {
        switchAudioOutput(false);

        if(botaoOn.disabled === false && definicoes.muted === false){
            botaoOn.disabled = true;
            botaoOff.disabled = false;
        }

        if (debug){
            console.log(debug_prefix + "Sound UnMuted");
        }
    });

    botaoOff.addEventListener("click", function (event) {
        switchAudioOutput(true);

        if(botaoOff.disabled === false && definicoes.muted === true){
            botaoOff.disabled = true;
            botaoOn.disabled = false;
        }

        if (debug){
            console.log(debug_prefix + "Sound muted");
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

    if( section === document.getElementById("Opcoes")){
        if(definicoes.muted){
            document.getElementById("BotaoOn").disabled = false;
            document.getElementById("BotaoOff").disabled = true;
        }
        else{
            document.getElementById("BotaoOn").disabled = true;
            document.getElementById("BotaoOff").disabled = false;
        }

        if(definicoes.volume === 1){
            document.getElementById("BotaoMais").disabled = true;
            document.getElementById("BotaoMenos").disabled = false;
        }
        else if(definicoes.volume === 0){
            document.getElementById("BotaoMais").disabled = false;
            document.getElementById("BotaoMenos").disabled = true;
        }
        else{
            document.getElementById("BotaoMais").disabled = false;
            document.getElementById("BotaoMenos").disabled = false;
        }

    }
    else if( section === document.getElementById("Bar")){
        if(definicoes.muted){
            document.getElementById("BotaoSomBar").style.filter = "grayscale(65%)";
        }
        else{
            document.getElementById("BotaoSomBar").style.filter = "grayscale(0%)";
        }
    }

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

    let botaoSom = document.getElementById("BotaoSomBar");

    if(definicoes.muted){
        botaoSom.style.filter = "grayscale(65%)";
    }
    else{
        botaoSom.style.filter = "grayscale(0%)";
    }

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

    document.getElementById("TextoVolume").innerHTML = Math.round(definicoes.volume * 100).toString();

    for (let audio of document.getElementsByTagName("audio")) {
        audio.volume = definicoes.volume;
    }
}

function switchAudioOutput(change=null) {
    if(change !== null){
        definicoes.muted = change;
    }
    else{
        definicoes.muted = !definicoes.muted;
    }

    for (let audio of document.getElementsByTagName("audio")) {
        audio.muted = definicoes.muted;
    }
}

function toggleAudio() {
    let audios = document.getElementsByTagName("audio");
    for (let curAudio of audios) {
        if (curAudio.paused && curAudio.currentTime > 0 && !curAudio.ended){
            curAudio.play();
        }
        else{
            curAudio.pause();
        }
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
        alteraTexto(visor, "Não tens dinheiro suficiente!", 10);
        compra = false;
    }
    else{
        jogador.alteraEnergia(energia);
        alteraTexto(visor, "Compra efetuada!", 10);
        document.getElementById('somDinheiro').play();
        compra = true;
    }

    let id = setTimeout(function () {
        alteraTexto(visor, "Efetua a tua compra!");
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

function bloqueiaFazerCadeiras() {
    document.getElementById("BotaoCadeirasBar").setAttribute("disabled","true");   //to disable the button

}
function desbloqueiaFazerCadeiras() {
    document.getElementById("BotaoCadeirasBar").removeAttribute("disabled");
    //document.getElementById("BotaoCadeirasBar").disabled=false;
    //document.getElementById("BotaoCadeirasBar").disableHover = true;

}

function showBaguetes(event){
    bloqueiaFazerCadeiras();
    let baguetes = document.getElementById("CompraBaguetes");
    baguetes.style.display = "block";
    let visor = document.getElementById("Visor");
    visor.innerHTML = "Efetua a tua compra!"
}

function hideBaguetes(event){
    desbloqueiaFazerCadeiras();
    for (let id1 of timeoutTextIds){
        clearTimeout(id1);
    }
    timeoutTextIds = [];

    let baguetes = document.getElementById("CompraBaguetes");
    baguetes.style.display = "none";
}


function showCadeiras(event) {
    let cadeiras = document.getElementById("FazerCadeiras");
    cadeiras.style.display = "block";
}
function hideCadeiras(event){
    for (let id1 of timeoutTextIds){
        clearTimeout(id1);
    }
    timeoutTextIds = [];

    let cadeiras = document.getElementById("FazerCadeiras");
    cadeiras.style.display = "none";
}

function desbloqueiaBaguete(nome){

}

function completaCadeira(nome) {

}

function hideGame() {
    toggleAudio();
    goBackBar();
    
}

function showGame(x, y, jogo) {
    let seccoes = document.getElementsByTagName("section");
    for(let sec of seccoes){
       sec.style.display = "none";
       if (sec.id === "Jogo"){
           sec.style.display = "block";
           sec.style.width = x;
           sec.style.height = y;
       }
    }

    toggleAudio();

    if (jogo === "TC"){

        gameTC.state.add("MainGameTC", gameStateTC);
        gameTC.state.start("MainGameTC");
    }
}