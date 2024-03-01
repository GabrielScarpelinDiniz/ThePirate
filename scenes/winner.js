class TelaVitoria extends Phaser.Scene {
    constructor(){
        super({key: 'Vitoria'}); // Nome da cena
    }
    preload(){
        
    }
    create(){
        this.add.text(100, 100, "Você venceu!", {fontSize: "64px", fill: "#000"}); // Texto
        this.add.text(100, 300, "Toque na tela para reiniciar", {fontSize: "64px", fill: "#000"}); // Texto
        this.input.on('pointerdown', function () { // Evento de clique na tela
            // Reinicia o jogo
            this.scene.start('Game');
            this.scene.stop('Vitoria');
        }, this);
    }
}