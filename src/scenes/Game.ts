import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.atlas('misc', 'assets/sprite-sheets/Items-Extras.png', 'assets/atlas/misc-atlas.json');

    this.load.audio('theme', [
      'assets/sound-fx/smb_1-up.wav',
    ]);

    this.add.text(100, 100, 'Button', { fontFamily: 'Emulogic' });
  }

  create() {
    this.add.image(50, 475, 'misc', 'hud-coin-1');

    this.sound.add('theme').play();
  }
}
