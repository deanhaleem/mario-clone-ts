import { physics } from '../../../utils/constants/Physics';
import { IEnemy } from '../types';
import { EnemyState } from './EnemyState';
import { FlippedEnemyState } from './FlippedEnemyState';

export class ShellEnemyState extends EnemyState {
  public override spriteName = 'Shell';

  constructor(enemy: IEnemy) {
    super(enemy);

    super.enemy.cutXVelocity();
    super.enemy.cutYVelocity();
    super.enemy.setMaxVelocity(physics.shellMaxVelocity);
  }

  public override stomp(): void {
    this.enemy.enemyState = new FlippedEnemyState(this.enemy);
  }
}
