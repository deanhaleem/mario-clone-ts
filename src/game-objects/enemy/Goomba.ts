import { Enemy } from './Enemy';

export class Goomba extends Enemy {
  protected override spriteName = 'Goomba';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
