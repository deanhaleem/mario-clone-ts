import { Enemy } from './Enemy';
import { SleepingEnemyState } from './state/SleepingEnemyState';

export class Koopa extends Enemy {
  protected override spriteName = 'Koopa';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.enemyState = new SleepingEnemyState(this);
  }
}
