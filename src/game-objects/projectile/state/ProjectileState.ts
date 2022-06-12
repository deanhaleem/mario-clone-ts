import { IProjectile } from '../types';
import { IProjectileState } from './types';

export abstract class ProjectileState implements IProjectileState {
  protected projectile: IProjectile;

  constructor(projectile: IProjectile) {
    this.projectile = projectile;
  }

  public update(time: number, delta: number): void {}
  public destroy(): void {}
  public land(): void {}
}
