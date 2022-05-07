import Phaser from 'phaser';
import { Mario } from '../game-objects/players/Mario';
import { IPlayer } from '../game-objects/players/types';
import SpriteFactory from '../graphics/SpriteFactory';

export default class Demo extends Phaser.Scene {
  private gameObject: IPlayer;

  private rt: Phaser.GameObjects.RenderTexture;

  private fpsText;

  constructor() {
    super('GameScene');
  }

  preload() {
    SpriteFactory.instance.loadContent(this);
  }

  create() {
    this.rt = this.add.renderTexture(0, 0, 800, 480);
    this.gameObject = new Mario(new Phaser.Math.Vector2(525, 200));

    this.fpsText = this.add.text(10, 10, 'FPS: -- \n-- Particles', {
      font: 'bold 26px Arial',
    });
  }

  private addDelta = 0;

  update(time: number, delta: number): void {
    this.gameObject.update(time, delta);
    this.addDelta += delta / 1000;

    this.rt.clear();
    this.fpsText.setText(
      `FPS: ${(1000 / delta).toFixed(3)}\nDelta: ${(delta / 1000).toFixed(
        4
      )}\nTime: ${time / 1000}\nAdd Delta: ${this.addDelta}`
    );
    this.rt.beginDraw();
    this.gameObject.draw(this.rt);
    this.rt.endDraw();
  }
}
