import { KinematicGameObject } from '../KinematicGameObject';
import { ActiveProjectileState } from './state/ActiveProjectileState';
import { IProjectileState } from './state/types';
import { IProjectile } from './types';

export abstract class Projectile
  extends KinematicGameObject
  implements IProjectile
{
  public projectileState: IProjectileState;

  protected constructor(
    location: Phaser.Math.Vector2,
    initialVelocity: Phaser.Math.Vector2,
    maxVelocity: Phaser.Math.Vector2
  ) {
    super(location, maxVelocity);

    this.projectileState = new ActiveProjectileState(this);

    super.applyImpulse(initialVelocity);
    super.direction = initialVelocity.x / Math.abs(initialVelocity.x);
  }

  public override update(time: number, delta: number): void {
    this.projectileState.update(time, delta);

    super.update(time, delta);
  }

  public destroy(): void {
    this.projectileState.destroy();
  }
}
