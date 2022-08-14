import { IProjectile } from '../../game-objects/projectile/types';
import { ICollision } from '../types';

export class ProjectileBlockCollisionHandler {
  private readonly projectile: IProjectile;
  private readonly collision: ICollision;

  constructor(projectile: IProjectile, collision: ICollision) {
    this.projectile = projectile;
    this.collision = collision;
  }

  public handleTopProjectileBlockCollision() {
    this.projectile.location.subtract({
      x: 0,
      y: this.collision.intersection.height,
    });
    this.projectile.land();
  }

  public handleBottomProjectileBlockCollision() {
    this.projectile.location.add({
      x: 0,
      y: this.collision.intersection.height,
    });
  }

  public handleLeftProjectileBlockCollision() {
    this.projectile.location.subtract({
      x: this.collision.intersection.width,
      y: 0,
    });
    this.projectile.destroy();
  }

  public handleRightProjectileBlockCollision() {
    this.projectile.location.add({
      x: this.collision.intersection.width,
      y: 0,
    });
    this.projectile.destroy();
  }
}
