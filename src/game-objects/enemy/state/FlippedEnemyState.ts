import { physics } from '../../../utils/constants/Physics';
import { IEnemy } from '../types';
import { EnemyState } from './EnemyState';

export class FlippedEnemyState extends EnemyState {
  public override spriteName = 'Flipped';

  constructor(enemy: IEnemy) {
    super(enemy);

    super.enemy.applyImpulse(physics.flippedEnemyImpulse);
    super.enemy.applyForce(physics.gravitationalForce);
    super.enemy.setMaxVelocity(physics.flippedEnemyMaxVelocity);
  }
}
