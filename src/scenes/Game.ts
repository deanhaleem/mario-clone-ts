import Phaser from 'phaser';
import { ISprite, Sprite, SpriteDetails } from '../graphics/Sprite';

export default class Demo extends Phaser.Scene {
  private sprite: ISprite;

  private rt: Phaser.GameObjects.RenderTexture;

  private fpsText;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.atlas('mario', 'assets/sprite-sheets/mario.png', 'assets/atlas/mario-atlas.json');
  }

  create() {
    // TODO: update atlas config to be like c#, except instead of the "0": [] for frames, I need to create entirely new object. key will just be dead-mario-0 for example

    const { frames } = this.textures.get('mario');
    this.sprite = new Sprite(frames['BigRightWalkingMario-0-0'].customData as SpriteDetails, 'mario', this);
    this.rt = this.add.renderTexture(0, 0, 800, 480);

    this.fpsText = this.add.text(10, 10, 'FPS: -- \n-- Particles', {
      font: 'bold 26px Arial',
      fill: '#ffffff',
    });
  }

  update(time: number, delta: number): void {
    this.sprite.update(time, delta);

    this.fpsText.setText(`FPS: ${(1000 / delta).toFixed(3)}`);

    this.rt.clear();
    this.rt.beginDraw();
    this.sprite.draw(this.rt, new Phaser.Math.Vector2(525, 200));
    this.rt.endDraw();
  }
}
