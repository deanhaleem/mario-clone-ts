import { IEnemy } from '../types';
import { EnemyState } from './EnemyState';

export abstract class DeadEnemyState extends EnemyState {
  constructor(enemy: IEnemy) {
    super(enemy);

    // Game1.instance.unregisterGameObject(enemy);
  }

  public stomp(): void {}
  public flip(): void {}
}
