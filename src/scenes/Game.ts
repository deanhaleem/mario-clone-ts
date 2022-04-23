import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.atlas('scenery', 'assets/sprite-sheets/background-pipes.png', 'assets/atlas/scenery-atlas.json');
    this.load.atlas('enemies', 'assets/sprite-sheets/enemies.png', 'assets/atlas/enemy-atlas.json');
    this.load.atlas('items', 'assets/sprite-sheets/Items-Projectiles.png', 'assets/atlas/item-atlas.json');
    this.load.atlas('blocks', 'assets/sprite-sheets/blocksp-pipes.png', 'assets/atlas/block-atlas.json');
    this.load.atlas('misc', 'assets/sprite-sheets/Items-Extras.png', 'assets/atlas/misc-atlas.json');
    this.load.atlas('mario', 'assets/sprite-sheets/mario.png', 'assets/atlas/mario-atlas.json');
  }

  create() {
    this.add.image(50, 475, 'misc', 'hud-coin-1');
  }
}
