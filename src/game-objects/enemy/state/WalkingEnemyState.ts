import { IEnemy } from '../types';
import { EnemyState } from './EnemyState';

export class WalkingEnemyState extends EnemyState {
  public override spriteName = 'Walking';

  constructor(enemy: IEnemy) {
    super(enemy);
  }
}
