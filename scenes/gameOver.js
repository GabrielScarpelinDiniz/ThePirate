class TelaPerdeu extends Phaser.Scene {
    constructor(){
        super({key: 'PerdeuTela'}); // Nome da cena
    }
    preload(){
        
    }
    create(){
        this.add.text(100, 100, "Você perdeu!", {fontSize: "64px", fill: "#000"}); // Texto
        this.add.text(100, 300, "Toque na tela para Reiniciar", {fontSize: "64px", fill: "#000"}); // Texto
        this.input.on('pointerdown', function () { // Evento de clique na tela
            // Reinicia o jogo
            this.scene.start('Game');
            this.scene.stop('PerdeuTela');
        }, this);
    }
}