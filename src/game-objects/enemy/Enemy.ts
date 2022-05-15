import { GameObject } from '../GameObject';
import { IEnemy } from './types';

export abstract class Enemy extends GameObject implements IEnemy {
  protected constructor(location: Phaser.Math.Vector2) {
    super(location);
  }
}
