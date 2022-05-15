import { GameObject } from '../GameObject';
import { IProjectile } from './types';

export abstract class Projectile extends GameObject implements IProjectile {
  protected constructor(location: Phaser.Math.Vector2) {
    super(location);
  }
}
