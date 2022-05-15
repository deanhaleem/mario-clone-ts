import { Projectile } from './Projectile';

export class Fireball extends Projectile {
  protected override spriteName = 'Fireball';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.setSprite(this.spriteName);
  }
}
