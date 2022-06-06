import { Enemy } from './Enemy';

export class Koopa extends Enemy {
  protected override spriteName = 'Koopa';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
