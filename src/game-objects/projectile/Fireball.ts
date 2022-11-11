import { physics } from '../../utils/constants/physics';
import { Projectile } from './Projectile';

export class Fireball extends Projectile {
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

  protected override get spriteName() {
    return 'Fireball';
  }

  public override fall(): void {}
}
