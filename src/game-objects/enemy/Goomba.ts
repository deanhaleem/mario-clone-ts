import { Enemy } from './Enemy';
import { SleepingEnemyState } from './state/SleepingEnemyState';

export class Goomba extends Enemy {
  protected override spriteName = 'Goomba';

  public constructor(location: Phaser.Math.Vector2) {
    super(location);

    super.enemyState = new SleepingEnemyState(this);
  }
}
