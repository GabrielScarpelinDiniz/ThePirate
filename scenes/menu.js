class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }
  preload() {
    this.load.image('menu', 'assets/Menu.jpg'); // Carrega a imagem de fundo
  }
  create() {
    
    this.add.image(0, 75, 'menu').setOrigin(0, 0).setScale(1200 / 1280); // Adiciona a imagem de fundo, seta a origem e escala
    this.add.text(0, 650, "Utilize as setas para mover o personagem.", { fontSize: "32px", fill: "#000" }); // Texto
    this.add.text(0, 700, "Dica: Encoste somente em cima dos inimigos", { fontSize: "24px", fill: "#000" }); // Texto
    this.input.on('pointerdown', function () { // Evento de clique na tela
      // Inicia o jogo
      this.scene.start('Game');
      this.scene.stop('Menu');
    }, this);
  }
}