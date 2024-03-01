class TelaPerdeu extends Phaser.Scene {
    constructor(){
        super({key: 'PerdeuTela'});
    }
    preload(){
        
    }
    create(){
        this.add.text(100, 100, "Você perdeu!", {fontSize: "64px", fill: "#000"});
        this.add.text(100, 300, "Toque na tela para Reiniciar", {fontSize: "64px", fill: "#000"});
        this.input.on('pointerdown', function () {
            this.scene.start('Game');
            this.scene.stop('PerdeuTela');
        }, this);
    }
}