import { IEnemy } from '../types';
import { DeadEnemyState } from './DeadEnemyState';

export class StompedEnemyState extends DeadEnemyState {
  public override spriteName = 'Stomped';

  constructor(enemy: IEnemy) {
    super(enemy);

    this.enemy.cutXVelocity();
    this.enemy.cutYVelocity();

    // TimedActionManager.instance.registerTimedAction(null, disposeOfEnemy, timers.stompedEnemy);
  }

  private disposeOfEnemy(): void {
    // Game1.instance.disposeOfObject(enemy);
  }
}
