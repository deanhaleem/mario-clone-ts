import Phaser from "phaser";
import SpriteFactory from "../graphics/SpriteFactory";
import { ISprite } from "../graphics/types";

export default class Demo extends Phaser.Scene {
  private sprite: ISprite;

  private rt: Phaser.GameObjects.RenderTexture;

  private fpsText;

  constructor() {
    super("GameScene");
  }

  preload() {
    SpriteFactory.instance.loadContent(this);
  }

  create() {
    this.rt = this.add.renderTexture(0, 0, 800, 480);
    this.sprite = SpriteFactory.instance.createSprite(
      "StarSmallLeftRunningMario"
    );

    this.fpsText = this.add.text(10, 10, "FPS: -- \n-- Particles", {
      font: "bold 26px Arial",
    });
  }

  private addDelta = 0;

  update(time: number, delta: number): void {
    this.sprite.update(time, delta);
    this.addDelta += delta / 1000;

    this.rt.clear();
    this.fpsText.setText(
      `FPS: ${(1000 / delta).toFixed(3)}\nDelta: ${(delta / 1000).toFixed(
        4
      )}\nTime: ${time / 1000}\nAdd Delta: ${this.addDelta}`
    );
    this.rt.beginDraw();
    this.sprite.draw(this.rt, new Phaser.Math.Vector2(525, 200));
    this.rt.endDraw();
  }
}
