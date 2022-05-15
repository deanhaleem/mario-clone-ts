import { Enemy } from './Enemy';

export class Goomba extends Enemy {
  protected override spriteName = 'WalkingGoomba';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
