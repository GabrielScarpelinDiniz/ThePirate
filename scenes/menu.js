class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }
  preload() {
    this.load.image('menu', 'assets/Menu.jpg');
  }
  create() {
    
    this.add.image(0, 75, 'menu').setOrigin(0, 0).setScale(1200 / 1280);
    this.input.on('pointerdown', function () {
      this.scene.start('Game');
      this.scene.stop('Menu');
    }, this);
  }
}