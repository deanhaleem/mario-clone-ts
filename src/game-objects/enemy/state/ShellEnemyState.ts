import { physics } from '../../../utils/constants/physics';
import { IEnemy } from '../types';
import { EnemyState } from './EnemyState';
import { FlippedEnemyState } from './FlippedEnemyState';

export class ShellEnemyState extends EnemyState {
  public override spriteName = 'Shell';

  constructor(enemy: IEnemy) {
    super(enemy);

    this.enemy.cutXVelocity();
    this.enemy.cutYVelocity();
    this.enemy.setMaxVelocity(physics.shellMaxVelocity);
  }

  public override stomp(): void {
    this.enemy.enemyState = new FlippedEnemyState(this.enemy);
  }
}
