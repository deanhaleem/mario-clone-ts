import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.atlas('mario', 'assets/sprite-sheets/mario.png', 'assets/atlas/mario-atlas.json');

    this.load.audio('theme', [
      'assets/sound-fx/smb_1-up.wav',
    ]);

    this.add.text(100, 100, 'Button', { fontFamily: 'Emulogic' });
  }

  create() {
    const image = this.add.image(50, 375, 'mario', 'small-left-jumping-mario');

    image.setScale(2).setTint(0xA290ff);
  }
}
