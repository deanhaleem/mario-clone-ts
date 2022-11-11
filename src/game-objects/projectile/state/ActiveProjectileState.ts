import { physics } from '../../../utils/constants/physics';
import { IProjectile } from '../types';
import { DestroyedProjectileState } from './DestroyedProjectileState';
import { ProjectileState } from './ProjectileState';

export class ActiveProjectileState extends ProjectileState {
  constructor(projectile: IProjectile) {
    super(projectile);

    this.projectile.applyForce(physics.gravitationalForce);
  }

  public override destroy(): void {
    this.projectile.projectileState = new DestroyedProjectileState(
      this.projectile
    );
  }

  public override land(): void {
    this.projectile.applyImpulse(
      physics.projectileBounceImpulse.subtract(
        new Phaser.Math.Vector2(0, this.projectile.velocity.y)
      )
    );
  }
}
