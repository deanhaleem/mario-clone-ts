import { IEnemy } from '../types';
import { EnemyState } from './EnemyState';

export class DeadEnemyState extends EnemyState {
  public override spriteName = 'Dead';

  constructor(enemy: IEnemy) {
    super(enemy);

    // Game1.instance.unregisterGameObject(enemy);
  }

  public stomp(): void {}
  public flip(): void {}
}
