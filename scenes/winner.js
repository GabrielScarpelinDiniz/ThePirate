class TelaVitoria extends Phaser.Scene {
    constructor(){
        super({key: 'Vitoria'});
    }
    preload(){
        
    }
    create(){
        this.add.text(100, 100, "Você venceu!", {fontSize: "64px", fill: "#000"});
        this.add.text(100, 300, "Toque na tela para reiniciar", {fontSize: "64px", fill: "#000"});
        this.input.on('pointerdown', function () {
            this.scene.start('Game');
            this.scene.stop('Vitoria');
        }, this);
    }
}