import { IEnemy } from '../types';
import { EnemyState } from './EnemyState';

export class StompedEnemyState extends EnemyState {
  public override spriteName = 'Stomped';

  constructor(enemy: IEnemy) {
    super(enemy);

    super.enemy.cutXVelocity();
    super.enemy.cutYVelocity();

    // TimedActionManager.instance.registerTimedAction(null, disposeOfEnemy, timers.stompedEnemy);
  }

  private disposeOfEnemy(): void {
    // Game1.instance.disposeOfObject(enemy);
  }
}
