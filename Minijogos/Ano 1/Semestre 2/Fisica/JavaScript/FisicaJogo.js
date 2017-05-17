"use strict";


let gameFisica = new Phaser.Game(800,600,Phaser.AUTO, 'Jogo');

window.addEventListener("contextmenu", function(event){
    // Se o botao direito do rato for clicado não abre o menu, apenas o abre nas outras ocasioes em que o faria, i.e. premir de uma tecla
    if (event.button === 2){
        event.preventDefault();
    }
});

gameFisica.state.add("BootState", BootState);
gameFisica.state.add("LoadState", LoadState);
gameFisica.state.add("IntroState", IntroState);
gameFisica.state.add("PlayState", PlayState);
gameFisica.state.add("EndState", EndState);
