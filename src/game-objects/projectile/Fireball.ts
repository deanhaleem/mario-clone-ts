import { physics } from '../../utils/constants/Physics';
import { Projectile } from './Projectile';

export class Fireball extends Projectile {
  protected override spriteName = 'Fireball';

  public constructor(
    location: Phaser.Math.Vector2,
    velocity: Phaser.Math.Vector2
  ) {
    super(location, velocity, physics.maxProjectileVelocity);

    super.setSprite(this.spriteName);
  }

  public override land(): void {
    this.projectileState.land();
  }

  public override fall(): void {}
}
