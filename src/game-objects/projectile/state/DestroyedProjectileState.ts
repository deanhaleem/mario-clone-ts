import { IProjectile } from '../types';
import { ProjectileState } from './ProjectileState';

export class DestroyedProjectileState extends ProjectileState {
  constructor(projectile: IProjectile) {
    super(projectile);

    this.projectile.cutXVelocity();
    this.projectile.cutYVelocity();
    // this.projectile.setSprite('destroyed');

    // TimedActionManager.instance.registerTimedAction(null, disposeOfProjectile, timers.projectileDestroyTimer);
    // Game1.instance.unregisterGameObject(base.projectile);
  }

  private disposeOfProjectile(): void {
    // Game1.instance.disposeOfObject(this.projectile)
  }
}
