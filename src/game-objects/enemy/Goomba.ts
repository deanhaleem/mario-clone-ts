import { Directions } from '../../physics/types';
import { Enemy } from './Enemy';
import { SleepingEnemyState } from './state/SleepingEnemyState';

export class Goomba extends Enemy {
  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.enemyState = new SleepingEnemyState(this);
    super.direction = Directions.Left;
  }
}
