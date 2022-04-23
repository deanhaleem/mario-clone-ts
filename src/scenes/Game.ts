import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.atlas('misc', 'assets/sprite-sheets/Items-Extras.png', 'assets/atlas/misc-atlas.json');
  }

  create() {
    this.add.image(50, 475, 'misc', 'hud-coin-1');
  }
}
