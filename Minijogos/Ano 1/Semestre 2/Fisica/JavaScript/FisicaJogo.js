"use strict";


let game = new Phaser.Game(800,600,Phaser.AUTO, 'Fisica');


window.addEventListener("contextmenu", function(event){
    // Se o botao direito do rato for clicado não abre o menu, apenas o abre nas outras ocasioes em que o faria, i.e. premir de uma tecla
    if (event.button === 2){
        event.preventDefault();
    }
});

game.state.add("BootState", BootState);
game.state.add("LoadState", LoadState);
game.state.add("IntroState", IntroState);
game.state.add("PlayState", PlayState);
game.state.add("EndState", EndState);
game.state.start("BootState");