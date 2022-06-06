import { physics } from '../../../utils/constants/Physics';
import { IEnemy } from '../types';
import { EnemyState } from './EnemyState';
import { WalkingEnemyState } from './WalkingEnemyState';

export class SleepingEnemyState extends EnemyState {
  public override spriteName = 'Sleeping';

  constructor(enemy: IEnemy) {
    super(enemy);

    this.enemy.cutYVelocity();
  }

  public override wakeUp(): void {
    this.enemy.applyImpulse(physics.enemyWakeUpImpulse);
    this.enemy.enemyState = new WalkingEnemyState(this.enemy);
  }
}
